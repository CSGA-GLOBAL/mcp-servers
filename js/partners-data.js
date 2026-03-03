// CSGA Global Partners Data - Complete Partner Directory
const CSGA_PARTNERS = {
  
  // Academic & Research Partners
  academic: {
    bmcc: {
      name: 'Borough of Manhattan Community College (BMCC)',
      type: 'Academic Partner',
      description: 'CUNY\'s premier cybersecurity education institution providing CASA certification curriculum and veteran training programs.',
      logo: '/assets/partners/bmcc-logo.png',
      highlights: ['CASA Certification', '200-Hour Program', 'Federal Aid Eligible'],
      website: 'https://bmcc-cyber.vercel.app/',
      partnership: 'CASA curriculum development and accreditation'
    },
    
    socraticArts: {
      name: 'Socratic Arts',
      type: 'Learning Design Partner',
      description: 'Roger Schank\'s learning design company providing advanced curriculum development and educational methodology expertise.',
      logo: '/assets/partners/socratic-arts-logo.png',
      highlights: ['Curriculum Design', 'Learning Science', 'McGarry Expertise'],
      partnership: 'Advanced learning design and curriculum optimization'
    },
    
    cuny: {
      name: 'City University of New York (CUNY)',
      type: 'Academic System Partner',
      description: 'Largest urban university system in the US providing accredited CASA certification and workforce development programs.',
      logo: '/assets/partners/cuny-logo.png',
      highlights: ['Largest Urban University', 'Accredited Programs', 'Workforce Development'],
      partnership: 'System-wide CASA certification and workforce development'
    }
  },
  
  // Enterprise & Technology Partners
  enterprise: {
    terranova: {
      name: 'Terranova Defense Solutions',
      type: 'Strategic Partner',
      description: '$256M valuation defense contractor providing sovereign AI governance solutions and CSGA Global chairmanship.',
      logo: '/assets/partners/terranova-logo.png',
      highlights: ['Defense Solutions', 'James Castle CEO', '$256M Valuation'],
      partnership: 'Strategic governance, defense AI solutions, and global chairmanship',
      valuation: '$256M'
    },
    
    quantranet: {
      name: 'QuantraNet',
      type: 'Technology Partner',
      description: 'Post-quantum cryptography solutions provider ensuring future-proof security for AI governance implementations.',
      logo: '/assets/partners/quantranet-logo.png',
      highlights: ['Quantum-Safe', 'PQC Solutions', 'Future-Proof'],
      partnership: 'Post-quantum cryptography integration for AI governance'
    },
    
    thnGlobal: {
      name: 'THN Global Pharma',
      type: 'Industry Partner',
      description: 'Pharmaceutical AI governance specialist providing regulatory compliance and ethical AI frameworks for healthcare applications.',
      logo: '/assets/partners/thn-global-logo.png',
      highlights: ['Healthcare AI', 'Regulatory Compliance', 'Pharma Expertise'],
      partnership: 'Healthcare AI governance and pharmaceutical compliance'
    },
    
    ei3: {
      name: 'Ei3 (Economic Intelligence Infrastructure)',
      type: 'Research Partner',
      description: 'Economic intelligence and AI market analysis providing strategic insights for AI governance policy development.',
      logo: '/assets/partners/ei3-logo.png',
      highlights: ['Economic Intelligence', 'Market Analysis', 'Policy Research'],
      partnership: 'Economic intelligence and market analysis for AI governance'
    }
  },
  
  // Government & Institutional Partners
  government: {
    feddev: {
      name: 'FedDev Ontario',
      type: 'Government Partner',
      description: 'Federal Economic Development Agency providing up to $10M matching funding for AI governance innovation programs.',
      logo: '/assets/partners/feddev-logo.png',
      highlights: ['$10M Match', 'Government Backing', 'Innovation Fund'],
      partnership: 'Federal funding and innovation support',
      funding: '$10M matching available'
    }
  },
  
  // Leadership & Governance
  leadership: {
    jamesCastle: {
      name: 'James Castle',
      role: 'Global Chairperson CSGA & CEO Terranova',
      description: 'Global chairperson of CSGA and CEO of Terranova Defense Solutions, leading strategic governance and defense AI initiatives.',
      expertise: ['Defense AI', 'Strategic Governance', 'Global Leadership'],
      background: 'CMMC co-creator, defense contractor, strategic governance expert'
    },
    
    nicholasTempleman: {
      name: 'Nicholas Templeman',
      role: 'CSOAI CEO & CSGA Director',
      description: 'CEO of CSOAI and Director of CSGA, driving Constitutional AI governance and certification programs.',
      expertise: ['Constitutional AI', 'AI Governance', 'Certification Programs'],
      background: 'AI governance entrepreneur, Constitutional AI expert'
    }
  }
};

// Export for use in website
if (typeof module !== 'undefined') {
  module.exports = CSGA_PARTNERS;
}

// Global access
window.CSGA_PARTNERS = CSGA_PARTNERS;
