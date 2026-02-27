# Development Guide - THN Global MCP Server

Complete guide for developers working on the THN Global MCP server.

## Environment Setup

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn
- Git
- TypeScript knowledge
- MCP protocol understanding

### Initial Setup

```bash
# Clone repository
cd mcp-servers/thn-global

# Install dependencies
npm install

# Verify installation
npm run build
npm start
```

## Project Structure

```
thn-global/
├── src/
│   ├── index.ts              # Server entry point and MCP handlers
│   ├── types.ts              # TypeScript interfaces and types
│   ├── schemas.ts            # Zod validation schemas
│   └── tools.ts              # Tool implementations
├── dist/                     # Compiled output
├── package.json              # Project metadata and dependencies
├── tsconfig.json             # TypeScript configuration
├── .eslintrc.json            # ESLint configuration
├── .prettierrc.json          # Prettier formatting config
├── .gitignore                # Git ignore rules
├── README.md                 # Project overview
├── USAGE_GUIDE.md            # User documentation
└── DEVELOPMENT.md            # This file
```

## Development Workflow

### 1. Running in Development Mode

```bash
# Watch mode - recompile on file changes
npm run watch

# In another terminal, test the server
npm start
```

### 2. Code Quality

```bash
# Lint TypeScript files
npm run lint

# Format code
npm run format

# Check formatting (without modifying)
npx prettier --check src
```

### 3. Building for Production

```bash
# Clean build
npm run build

# Verify build output
ls -la dist/
```

## Adding New Tools

### Step 1: Define Types

Add new types to `src/types.ts`:

```typescript
export interface MyToolInput {
  parameter1: string;
  parameter2: number;
}

export interface MyToolOutput {
  result: string;
  value: number;
}
```

### Step 2: Create Validation Schema

Add schema to `src/schemas.ts`:

```typescript
export const MyToolInputSchema = z.object({
  parameter1: z.string().min(1),
  parameter2: z.number().positive(),
});

export type MyToolInput = z.infer<typeof MyToolInputSchema>;
```

### Step 3: Implement Tool

Add implementation to `src/tools.ts`:

```typescript
export async function myTool(input: MyToolInput): Promise<MyToolOutput> {
  // Implementation
  return {
    result: "processed",
    value: input.parameter2 * 2,
  };
}
```

### Step 4: Register in Server

Update `src/index.ts`:

```typescript
// Add to TOOLS array
{
  name: "my_tool",
  description: "Tool description",
  inputSchema: MyToolInputSchema.describe("Input parameters"),
}

// Add to CallToolRequestSchema handler
case "my_tool": {
  const validatedInput = MyToolInputSchema.parse(args);
  result = await myTool(validatedInput);
  break;
}
```

## Understanding the MCP Protocol

### Server Initialization

```typescript
const server = new Server({
  name: "thn-global-mcp",
  version: "1.0.0",
});
```

### Request Handlers

The server implements two main request handlers:

1. **ListToolsRequestSchema**: Returns available tools
2. **CallToolRequestSchema**: Executes requested tool

### Response Format

All responses must include:
- `type: "tool_result"`
- `content: [TextContent | ImageContent | ...]`
- `isError?: boolean` (for errors)

## Type System

### Zod Schemas

All inputs are validated using Zod:

```typescript
const schema = z.object({
  field: z.string().min(1).describe("Field description"),
  number: z.number().positive(),
  enum: z.enum(["option1", "option2"]),
  array: z.array(z.string()),
});
```

### TypeScript Types

Generated from schemas:

```typescript
type Input = z.infer<typeof schema>;
```

## Testing Strategy

### Unit Testing (Future)

```typescript
// Example test structure
describe("thn_patent_landscape", () => {
  it("should return valid patent landscape", async () => {
    const input = {
      therapeutic_area: "oncology",
      molecule_type: "small_molecule",
      target_pathway: "PD-1",
      date_range: { start_year: 2020, end_year: 2024 },
    };
    const result = await patentLandscapeAnalysis(input);
    expect(result.patent_density_map).toBeDefined();
  });
});
```

## Performance Optimization

### Current Implementation

- **Response Time**: <100ms for all tools
- **Memory**: ~50MB baseline
- **Data Generation**: Simulated, instant

### Production Considerations

- Implement caching for repeated queries
- Add request rate limiting
- Monitor tool execution times
- Optimize database queries
- Implement async batching

## Error Handling

### Validation Errors

```typescript
try {
  const validatedInput = MySchema.parse(args);
} catch (error) {
  // Zod throws ZodError with detailed validation info
  const message = error instanceof z.ZodError
    ? error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join('; ')
    : String(error);
}
```

### Execution Errors

```typescript
try {
  result = await myTool(validatedInput);
} catch (error) {
  return {
    type: "tool_result",
    content: [{
      type: "text",
      text: `Error: ${error instanceof Error ? error.message : String(error)}`,
    }],
    isError: true,
  };
}
```

## Data Management

### Current Approach

All data is generated procedurally:
- No external API calls
- No persistent storage
- Deterministic but varied outputs
- Realistic industry parameters

### Future Data Sources

Recommended integrations:

1. **Patent Data**
   - USPTO Patent Full-Text Database
   - WIPO Global Patent Index
   - Google Patents API

2. **Clinical Data**
   - ClinicalTrials.gov API
   - FDA CBER Drug Database
   - EMA Medicines Database

3. **Market Data**
   - Bloomberg API
   - Cortellis (Clarivate) API
   - proprietary market databases

4. **Deal Data**
   - BiopharmGuy (XO1)
   - Torreya Associates
   - PharmaCompass

## Logging and Debugging

### Current Logging

```typescript
// Server startup
console.error("THN Global MCP Server started successfully");

// Tool execution (via MCP protocol)
```

### Adding Debug Logs

```typescript
// Development logging
if (process.env.DEBUG) {
  console.error(`Executing tool: ${name}`, args);
}
```

### MCP Protocol Logging

The MCP SDK handles protocol logging. Enable via:

```bash
DEBUG=* npm start
```

## Deployment

### Local Testing

```bash
# Build and start
npm run build
npm start

# Test with MCP client
# (client implementation depends on your MCP client setup)
```

### Docker Deployment (Future)

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
CMD ["node", "dist/index.js"]
```

### Environment Variables

Currently none required. Future versions may support:

```bash
# Optional configuration
DEBUG=mcp:*
LOG_LEVEL=info
```

## Dependencies

### Production
- `@modelcontextprotocol/sdk`: MCP protocol implementation
- `zod`: Runtime schema validation

### Development
- `typescript`: TypeScript compiler
- `@typescript-eslint/*`: Linting
- `prettier`: Code formatting
- `@types/node`: Node.js types

### Update Strategy

```bash
# Check for updates
npm outdated

# Update specific package
npm update @modelcontextprotocol/sdk

# Update all
npm update
```

## Code Style

### TypeScript Best Practices

```typescript
// Use explicit return types
async function myTool(input: InputType): Promise<OutputType> {
  // Implementation
}

// Avoid any
const data: unknown = someValue;
if (typeof data === "object") {
  // Now safe to use data
}

// Use const for immutability
const config = { /*...*/ } as const;
```

### Naming Conventions

- **Functions**: camelCase (`patentLandscapeAnalysis`)
- **Types**: PascalCase (`PatentLandscapeResult`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_TIMEOUT`)
- **Files**: lowercase with hyphens (`index.ts`, `.eslintrc.json`)

### Comments

```typescript
/**
 * Brief description
 *
 * Longer explanation if needed.
 *
 * @param input - Description of input
 * @returns Description of return value
 */
async function myFunction(input: InputType): Promise<OutputType> {
  // Implementation
}
```

## Documentation

### Code Documentation

- JSDoc comments for all public functions
- Type descriptions in Zod schemas
- Inline comments for complex logic

### User Documentation

- README.md: Overview and quick start
- USAGE_GUIDE.md: Detailed usage examples
- Tool descriptions: Clear, actionable descriptions

### API Documentation

All tools are self-documenting via:
- Tool names and descriptions
- Input schemas with field descriptions
- Expected output structure
- Example requests and responses

## Contributing

### Before Submitting Changes

1. Lint and format code
   ```bash
   npm run lint
   npm run format
   ```

2. Build successfully
   ```bash
   npm run build
   ```

3. Test manually
   ```bash
   npm start
   ```

4. Update documentation
   - Update README if adding features
   - Update USAGE_GUIDE if changing APIs
   - Add JSDoc comments

### Commit Message Guidelines

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`

Example:
```
feat(tools): add drug discovery optimization tool

Add new tool for pipeline optimization with ML-based feasibility scoring.

Closes #123
```

## Troubleshooting

### Build Errors

```bash
# Clean build
rm -rf dist node_modules
npm install
npm run build
```

### Type Errors

```bash
# Check TypeScript
npx tsc --noEmit

# View full error
npx tsc --pretty false --noEmit
```

### Runtime Errors

```bash
# Run with debug output
DEBUG=* npm start
```

## Performance Monitoring

### Adding Metrics

```typescript
const start = performance.now();
const result = await myTool(input);
const duration = performance.now() - start;
console.error(`Tool execution: ${duration}ms`);
```

### Benchmarking Tools

```bash
# Simple timing
time npm start
```

## Security Considerations

### Input Validation

- All inputs validated via Zod
- No arbitrary code execution
- Type-safe parameter handling

### Data Privacy

- No external data transmission
- No logging of sensitive inputs
- Simulated data only

### Dependencies

- Regular dependency updates
- Review security advisories
- Minimal dependency tree

## Future Enhancements

1. **Real Data Integration**
   - Patent database APIs
   - Clinical trial data
   - Market intelligence APIs

2. **Advanced Features**
   - ML-powered predictions
   - Custom report generation
   - Visualization generation

3. **Performance**
   - Response caching
   - Batch processing
   - Async job handling

4. **Expansion**
   - Additional therapeutic areas
   - New tool categories
   - Custom configurations

## Resources

- [MCP Specification](https://spec.modelcontextprotocol.io/)
- [Zod Documentation](https://zod.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Node.js Documentation](https://nodejs.org/docs/)

## Support

For questions or issues:
1. Check documentation
2. Review existing code examples
3. Contact THN Global team

## License

CC0-1.0 - Public Domain
