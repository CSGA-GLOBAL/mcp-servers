/**
 * algorithms.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 Terranova Defence Inc.. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


import {
  AlgorithmRecommendationInputSchema,
  AlgorithmRecommendationResult,
  RecommendedAlgorithm,
  PerformanceBenchmark,
  ImplementationLibrary,
} from '../types';

export function recommendPQCAlgorithms(input: unknown): AlgorithmRecommendationResult {
  const validatedInput = AlgorithmRecommendationInputSchema.parse(input);

  const recommended = selectRecommendedAlgorithms(
    validatedInput.useCase,
    validatedInput.performanceRequirements || 'balanced',
    validatedInput.platformConstraints || []
  );

  const benchmarks = generatePerformanceBenchmarks(recommended);

  const libraries = getImplementationLibraries(recommended);

  const hybridApproach = generateHybridApproachSummary(validatedInput.useCase);

  const migrationPath = generateMigrationPath(validatedInput.useCase);

  return {
    useCase: validatedInput.useCase,
    recommendedAlgorithms: recommended,
    performanceBenchmarks: benchmarks,
    implementationLibraries: libraries,
    hybridApproach,
    migrationPath,
  };
}

function selectRecommendedAlgorithms(
  useCase: string,
  _performanceRequirements: string,
  _platformConstraints: string[]
): RecommendedAlgorithm[] {
  const algorithms: RecommendedAlgorithm[] = [];

  if (useCase === 'key_exchange') {
    // Primary recommendation
    algorithms.push({
      name: 'ML-KEM (CRYSTALS-Kyber)',
      category: 'Key Encapsulation Mechanism',
      securityLevel: 3,
      keySize: 1024,
      maturity: 'standardized',
      pros: [
        'FIPS 203 standardized (Nov 2024)',
        'Excellent performance characteristics',
        'Small ciphertext size (768 bytes)',
        'Lattice-based, well-studied',
        'Suitable for TLS integration',
      ],
      cons: [
        'Larger public key than classical ECC (1184 bytes)',
        'Newer than RSA/ECDSA - less deployed history',
      ],
      suitableFor: [
        'TLS/SSL handshakes',
        'HTTPS connections',
        'VPN key exchange',
        'Hybrid deployments',
      ],
    });

    // Alternative for constrained environments
    if (_platformConstraints.includes('embedded') || _platformConstraints.includes('iot')) {
      algorithms.push({
        name: 'Kyber512',
        category: 'Key Encapsulation Mechanism (Lightweight)',
        securityLevel: 2,
        keySize: 512,
        maturity: 'standardized',
        pros: ['Smaller keys and ciphertexts', 'Lower computational requirements', 'Good for IoT'],
        cons: ['Reduced security level compared to Kyber1024'],
        suitableFor: ['IoT devices', 'Embedded systems', 'Resource-constrained environments'],
      });
    }
  } else if (useCase === 'digital_signature') {
    // Primary recommendation
    algorithms.push({
      name: 'ML-DSA (CRYSTALS-Dilithium)',
      category: 'Digital Signature Algorithm',
      securityLevel: 3,
      keySize: 2544,
      maturity: 'standardized',
      pros: [
        'FIPS 204 standardized (Nov 2024)',
        'Strong security with good performance',
        'Lattice-based foundation',
        'Suitable for code signing',
        'Certificate generation compatible',
      ],
      cons: [
        'Larger signature size than classical algorithms (2420 bytes)',
        'Larger key material than ECDSA',
      ],
      suitableFor: [
        'Code signing',
        'Document signatures',
        'Certificate generation',
        'Authentication',
      ],
    });

    // Hash-based alternative for maximum security
    algorithms.push({
      name: 'SLH-DSA (SPHINCS+)',
      category: 'Hash-Based Digital Signature',
      securityLevel: 2,
      keySize: 32,
      maturity: 'standardized',
      pros: [
        'FIPS 205 standardized (Nov 2024)',
        'Stateless - no internal state management',
        'Cryptographically conservative - based on hash functions',
        'Proven security properties',
        'Good for offline signing',
      ],
      cons: [
        'Slower signature generation than lattice-based',
        'Larger signatures (17 KB)',
        'More conservative approach',
      ],
      suitableFor: [
        'Long-term archives',
        'Offline signatures',
        'Stateless applications',
        'Backup signing method',
      ],
    });

    // High-performance alternative
    algorithms.push({
      name: 'FALCON',
      category: 'Lattice-Based Signature (Compact)',
      securityLevel: 3,
      keySize: 512,
      maturity: 'standardized',
      pros: [
        'FIPS 206 standardized (Feb 2024)',
        'Smallest signature size among NIST finalists (666 bytes)',
        'Fast signature generation',
        'Good for bandwidth-constrained environments',
      ],
      cons: [
        'More complex implementation',
        'Patent considerations',
        'Newer standardization',
      ],
      suitableFor: [
        'Bandwidth-critical applications',
        'Embedded systems',
        'Certificate signatures',
        'Performance-critical signing',
      ],
    });
  } else if (useCase === 'encryption') {
    algorithms.push({
      name: 'ML-KEM + AES-256-GCM',
      category: 'Hybrid Encryption (KEM + AEAD)',
      securityLevel: 3,
      keySize: 1024,
      maturity: 'standardized',
      pros: [
        'Combines PQC key encapsulation with proven symmetric encryption',
        'ML-KEM standardized in FIPS 203',
        'AES-GCM provides authenticated encryption',
        'Supports large data volumes efficiently',
      ],
      cons: [
        'Requires two algorithms',
        'Slightly more complex than single algorithm',
      ],
      suitableFor: [
        'Data encryption at rest',
        'File encryption',
        'Database encryption',
        'Archive encryption',
      ],
    });
  }

  return algorithms;
}

function generatePerformanceBenchmarks(algorithms: RecommendedAlgorithm[]): PerformanceBenchmark[] {
  const benchmarks: PerformanceBenchmark[] = [];

  const benchmarkData: { [key: string]: Omit<PerformanceBenchmark, 'algorithm'> } = {
    'ML-KEM': {
      keyGeneration: '~100 microseconds',
      encryption: '~150 microseconds (encapsulation)',
      decryption: '~200 microseconds (decapsulation)',
      signatureGeneration: 'N/A - KEM only',
      signatureVerification: 'N/A - KEM only',
      keySize: '1184 bytes public / 2400 bytes private',
      signatureSize: 'N/A - generates 768-byte ciphertext',
    },
    'Kyber512': {
      keyGeneration: '~50 microseconds',
      encryption: '~100 microseconds',
      decryption: '~150 microseconds',
      signatureGeneration: 'N/A',
      signatureVerification: 'N/A',
      keySize: '672 bytes public / 1632 bytes private',
      signatureSize: '512-byte ciphertext',
    },
    'ML-DSA': {
      keyGeneration: '~300 microseconds',
      encryption: 'N/A - Signature only',
      decryption: 'N/A - Signature only',
      signatureGeneration: '~400 microseconds',
      signatureVerification: '~500 microseconds',
      keySize: '1312 bytes public / 2544 bytes private',
      signatureSize: '2420 bytes',
    },
    'SLH-DSA': {
      keyGeneration: '~150 microseconds',
      encryption: 'N/A',
      decryption: 'N/A',
      signatureGeneration: '~3 milliseconds (stateless)',
      signatureVerification: '~500 microseconds',
      keySize: '32 bytes public / 64 bytes private',
      signatureSize: '17408 bytes (conservative)',
    },
    'FALCON': {
      keyGeneration: '~500 microseconds (variable)',
      encryption: 'N/A',
      decryption: 'N/A',
      signatureGeneration: '~300 microseconds (very fast)',
      signatureVerification: '~400 microseconds',
      keySize: '897 bytes public / 1281 bytes private',
      signatureSize: '666 bytes (compact)',
    },
  };

  for (const algo of algorithms) {
    const data = benchmarkData[algo.name];
    if (data) {
      benchmarks.push({
        algorithm: algo.name,
        ...data,
      });
    }
  }

  return benchmarks;
}

function getImplementationLibraries(algorithms: RecommendedAlgorithm[]): ImplementationLibrary[] {
  const librariesByAlgo: { [key: string]: ImplementationLibrary[] } = {
    'ML-KEM': [
      {
        name: 'liboqs',
        language: 'C with bindings',
        algorithms: ['ML-KEM', 'ML-DSA', 'SLH-DSA'],
        maturity: 'production',
        licenseType: 'MIT',
        sourceUrl: 'https://github.com/open-quantum-safe/liboqs',
      },
      {
        name: 'libpqcrypto',
        language: 'C',
        algorithms: ['ML-KEM', 'ML-DSA'],
        maturity: 'stable',
        licenseType: 'Public Domain',
        sourceUrl: 'https://github.com/jedisct1/libpqcrypto',
      },
      {
        name: 'pqcrypto-rustcrypto',
        language: 'Rust',
        algorithms: ['ML-KEM', 'ML-DSA'],
        maturity: 'stable',
        licenseType: 'MIT/Apache-2.0',
        sourceUrl: 'https://github.com/RustCrypto/post-quantum-cryptography',
      },
      {
        name: 'OpenSSL 3.x',
        language: 'C (with OpenSSL wrapper)',
        algorithms: ['ML-KEM', 'ML-DSA'],
        maturity: 'production',
        licenseType: 'Apache 2.0',
        sourceUrl: 'https://www.openssl.org/',
      },
    ],
    'ML-DSA': [
      {
        name: 'liboqs',
        language: 'C with bindings',
        algorithms: ['ML-KEM', 'ML-DSA', 'SLH-DSA'],
        maturity: 'production',
        licenseType: 'MIT',
        sourceUrl: 'https://github.com/open-quantum-safe/liboqs',
      },
      {
        name: 'ML-DSA Reference Implementation',
        language: 'C',
        algorithms: ['ML-DSA'],
        maturity: 'stable',
        licenseType: 'Public Domain',
        sourceUrl: 'https://csrc.nist.gov/projects/post-quantum-cryptography/',
      },
    ],
    'SLH-DSA': [
      {
        name: 'liboqs',
        language: 'C with bindings',
        algorithms: ['ML-KEM', 'ML-DSA', 'SLH-DSA'],
        maturity: 'production',
        licenseType: 'MIT',
        sourceUrl: 'https://github.com/open-quantum-safe/liboqs',
      },
      {
        name: 'SPHINCS Reference Implementation',
        language: 'C',
        algorithms: ['SLH-DSA', 'SPHINCS+'],
        maturity: 'stable',
        licenseType: 'Public Domain',
        sourceUrl: 'https://sphincs.org/',
      },
    ],
    'FALCON': [
      {
        name: 'FALCON Reference Implementation',
        language: 'C',
        algorithms: ['FALCON'],
        maturity: 'production',
        licenseType: 'MIT',
        sourceUrl: 'https://falcon-sign.info/',
      },
      {
        name: 'liboqs',
        language: 'C with bindings',
        algorithms: ['ML-KEM', 'ML-DSA', 'FALCON'],
        maturity: 'production',
        licenseType: 'MIT',
        sourceUrl: 'https://github.com/open-quantum-safe/liboqs',
      },
    ],
  };

  const uniqueLibraries = new Map<string, ImplementationLibrary>();
  for (const algo of algorithms) {
    const libs = librariesByAlgo[algo.name] || [];
    for (const lib of libs) {
      uniqueLibraries.set(lib.name, lib);
    }
  }

  return Array.from(uniqueLibraries.values()).slice(0, 5);
}

function generateHybridApproachSummary(useCase: string): string {
  if (useCase === 'key_exchange') {
    return 'Recommended: Run ML-KEM in parallel with classical ECDH during transition period. Both generate shared secrets that are combined using KDF (Key Derivation Function) to ensure security against both classical and quantum adversaries.';
  } else if (useCase === 'digital_signature') {
    return 'Recommended: Generate both ML-DSA and classical RSA/ECDSA signatures on critical documents. Verify that at least one signature validates before accepting. This ensures authenticity even if either algorithm is later compromised.';
  } else if (useCase === 'encryption') {
    return 'Recommended: Encrypt data with both classical AES-256 and ML-KEM+AES-256-GCM using independent key material. This provides defense-in-depth during the transition to PQC.';
  }
  return 'Recommended: Implement hybrid approach combining classical cryptography with PQC algorithms during the transition period.';
}

function generateMigrationPath(useCase: string): string[] {
  const migrationSteps: { [key: string]: string[] } = {
    key_exchange: [
      '1. Evaluate ML-KEM performance in your TLS stack (6 weeks)',
      '2. Deploy hybrid ECDH + ML-KEM in staging environment (2 months)',
      '3. Run parallel classical + PQC key exchange in production (3-6 months)',
      '4. Monitor performance and gather metrics (ongoing)',
      '5. Transition fully to ML-KEM when standardization is complete (2025-2026)',
      '6. Deprecate classical ECDH/RSA key exchange (2027-2028)',
    ],
    digital_signature: [
      '1. Integrate ML-DSA signature generation (4 weeks)',
      '2. Implement dual-signature approach (2 weeks)',
      '3. Deploy to code signing pipeline (1 month)',
      '4. Apply dual-signatures to all certificates (3 months)',
      '5. Monitor ecosystem adoption of PQC signature verification (ongoing)',
      '6. Deprecate classical-only signatures (2027-2028)',
    ],
    encryption: [
      '1. Assess current encryption architecture (2 weeks)',
      '2. Integrate ML-KEM key establishment (6 weeks)',
      '3. Deploy hybrid encryption in new implementations (2 months)',
      '4. Re-key critical data with ML-KEM (3-6 months)',
      '5. Maintain hybrid approach for data encrypted during transition (long-term)',
      '6. Plan for future re-encryption strategies (2025+)',
    ],
  };

  return migrationSteps[useCase] || [];
}

export function generateAlgorithmSelectionGuide(recommendations: AlgorithmRecommendationResult): string {
  let guide = `
QUANTRANET PQC ALGORITHM SELECTION GUIDE
========================================

Use Case: ${recommendations.useCase.toUpperCase()}
Assessment Date: ${new Date().toISOString().split('T')[0]}

RECOMMENDED ALGORITHMS:
${recommendations.recommendedAlgorithms
  .map(
    (algo, idx) => `
${idx + 1}. ${algo.name}
   Category: ${algo.category}
   Security Level: ${algo.securityLevel}/5
   Key Size: ${algo.keySize} bits
   Maturity: ${algo.maturity.toUpperCase()}

   Advantages:
${algo.pros.map((pro) => `   - ${pro}`).join('\n')}

   Considerations:
${algo.cons.map((con) => `   - ${con}`).join('\n')}

   Suitable For: ${algo.suitableFor.join(', ')}
`
  )
  .join('')}

PERFORMANCE BENCHMARKS:
${recommendations.performanceBenchmarks
  .map(
    (bench) => `
${bench.algorithm}:
  Key Generation: ${bench.keyGeneration}
  Encryption/Encapsulation: ${bench.encryption}
  Decryption/Decapsulation: ${bench.decryption}
  Signature Generation: ${bench.signatureGeneration}
  Signature Verification: ${bench.signatureVerification}
  Key Size: ${bench.keySize}
  Signature Size: ${bench.signatureSize}
`
  )
  .join('')}

IMPLEMENTATION LIBRARIES:
${recommendations.implementationLibraries
  .map(
    (lib) => `
- ${lib.name} (${lib.language})
  Algorithms: ${lib.algorithms.join(', ')}
  Maturity: ${lib.maturity}
  License: ${lib.licenseType}
  Source: ${lib.sourceUrl}
`
  )
  .join('')}

HYBRID APPROACH:
${recommendations.hybridApproach}

MIGRATION PATH:
${recommendations.migrationPath.map((step) => `${step}`).join('\n')}

For implementation support, contact QuantraNet's technical team.
`;

  return guide;
}
