/* =============================================================================
   KIMI LAB - CHEMISTRY LEARNING CENTER MODULE
   Educational content, Quizzes, Progress Tracking
   ============================================================================= */

// Chemistry Learning Center System
const learningCenter = {
  
  // Chemical Basics Module
  chemicalBasics: {
    elements: [
      { symbol: 'H', name: 'Hydrogen', atomicNumber: 1, atomicMass: 1.008, category: 'Nonmetal' },
      { symbol: 'C', name: 'Carbon', atomicNumber: 6, atomicMass: 12.01, category: 'Nonmetal' },
      { symbol: 'N', name: 'Nitrogen', atomicNumber: 7, atomicMass: 14.01, category: 'Nonmetal' },
      { symbol: 'O', name: 'Oxygen', atomicNumber: 8, atomicMass: 16.00, category: 'Nonmetal' },
      { symbol: 'Na', name: 'Sodium', atomicNumber: 11, atomicMass: 22.99, category: 'Alkali Metal' },
      { symbol: 'Cl', name: 'Chlorine', atomicNumber: 17, atomicMass: 35.45, category: 'Halogen' }
    ],
    
    basics: [
      {
        id: 'basic-001',
        topic: 'What are Elements?',
        description: 'Elements are pure substances made of only one type of atom.',
        example: 'Oxygen (O), Hydrogen (H), Gold (Au)'
      },
      {
        id: 'basic-002',
        topic: 'What are Compounds?',
        description: 'Compounds are substances formed by chemically bonding two or more elements.',
        example: 'Water (H₂O), Salt (NaCl), Sugar (C₆H₁₂O₆)'
      },
      {
        id: 'basic-003',
        topic: 'What are Mixtures?',
        description: 'Mixtures are combinations of two or more substances that are not chemically bonded.',
        example: 'Saltwater, Air, Soil'
      },
      {
        id: 'basic-004',
        topic: 'What are Atoms?',
        description: 'Atoms are the smallest units of an element that can exist independently.',
        example: 'A single oxygen atom (O) vs. an oxygen molecule (O₂)'
      },
      {
        id: 'basic-005',
        topic: 'What are Molecules?',
        description: 'Molecules are groups of atoms bonded together.',
        example: 'Oxygen molecule (O₂), Water molecule (H₂O)'
      },
      {
        id: 'basic-006',
        topic: 'What are Ions?',
        description: 'Ions are atoms or molecules that have gained or lost electrons, giving them a net charge.',
        example: 'Sodium ion (Na⁺), Chloride ion (Cl⁻)'
      }
    ]
  },
  
  // Interactive Periodic Table
  periodicTable: [
    { symbol: 'H', name: 'Hydrogen', atomicNumber: 1, atomicMass: 1.008, group: 1, period: 1, category: 'Nonmetal' },
    { symbol: 'He', name: 'Helium', atomicNumber: 2, atomicMass: 4.003, group: 18, period: 1, category: 'Noble Gas' },
    { symbol: 'Li', name: 'Lithium', atomicNumber: 3, atomicMass: 6.941, group: 1, period: 2, category: 'Alkali Metal' },
    { symbol: 'Be', name: 'Beryllium', atomicNumber: 4, atomicMass: 9.012, group: 2, period: 2, category: 'Alkaline Earth Metal' },
    { symbol: 'B', name: 'Boron', atomicNumber: 5, atomicMass: 10.81, group: 13, period: 2, category: 'Semimetal' },
    { symbol: 'C', name: 'Carbon', atomicNumber: 6, atomicMass: 12.01, group: 14, period: 2, category: 'Nonmetal' },
    { symbol: 'N', name: 'Nitrogen', atomicNumber: 7, atomicMass: 14.01, group: 15, period: 2, category: 'Nonmetal' },
    { symbol: 'O', name: 'Oxygen', atomicNumber: 8, atomicMass: 16.00, group: 16, period: 2, category: 'Nonmetal' },
    { symbol: 'F', name: 'Fluorine', atomicNumber: 9, atomicMass: 19.00, group: 17, period: 2, category: 'Halogen' },
    { symbol: 'Ne', name: 'Neon', atomicNumber: 10, atomicMass: 20.18, group: 18, period: 2, category: 'Noble Gas' },
    { symbol: 'Na', name: 'Sodium', atomicNumber: 11, atomicMass: 22.99, group: 1, period: 3, category: 'Alkali Metal' },
    { symbol: 'Cl', name: 'Chlorine', atomicNumber: 17, atomicMass: 35.45, group: 17, period: 3, category: 'Halogen' },
    { symbol: 'Ag', name: 'Silver', atomicNumber: 47, atomicMass: 107.87, group: 11, period: 5, category: 'Transition Metal' },
    { symbol: 'Au', name: 'Gold', atomicNumber: 79, atomicMass: 196.97, group: 11, period: 6, category: 'Transition Metal' }
  ],
  
  // Reaction Types
  reactionTypes: [
    {
      id: 'rxn-001',
      type: 'Synthesis',
      description: 'Two or more elements or compounds combine to form a new compound.',
      formula: 'A + B → AB',
      example: '2H₂ + O₂ → 2H₂O',
      educational: true
    },
    {
      id: 'rxn-002',
      type: 'Decomposition',
      description: 'A compound breaks down into two or more simpler substances.',
      formula: 'AB → A + B',
      example: '2H₂O → 2H₂ + O₂',
      educational: true
    },
    {
      id: 'rxn-003',
      type: 'Single Displacement',
      description: 'One element replaces another element in a compound.',
      formula: 'A + BC → AC + B',
      example: 'Zn + 2HCl → ZnCl₂ + H₂',
      educational: true
    },
    {
      id: 'rxn-004',
      type: 'Double Displacement',
      description: 'Two compounds exchange ions to form two new compounds.',
      formula: 'AB + CD → AD + CB',
      example: 'AgNO₃ + NaCl → AgCl + NaNO₃',
      educational: true
    },
    {
      id: 'rxn-005',
      type: 'Acid-Base Neutralization',
      description: 'An acid and a base react to produce a salt and water.',
      formula: 'HCl + NaOH → NaCl + H₂O',
      example: 'Strong acid + Strong base → Salt + Water',
      educational: true
    },
    {
      id: 'rxn-006',
      type: 'Precipitation',
      description: 'Two solutions combine to form an insoluble solid.',
      formula: 'AB + CD → AD↓ + CB',
      example: 'AgNO₃ + NaCl → AgCl↓ + NaNO₃',
      educational: true
    },
    {
      id: 'rxn-007',
      type: 'Redox (Oxidation-Reduction)',
      description: 'Electrons are transferred between reactants.',
      formula: 'Oxidation + Reduction',
      example: 'Cu + 2H₂SO₄ → CuSO₄ + SO₂ + 2H₂O',
      educational: true
    }
  ],
  
  // Chemistry Glossary
  glossary: [
    { term: 'Acid', definition: 'A substance that donates protons (H⁺) and has a pH less than 7.' },
    { term: 'Base', definition: 'A substance that accepts protons and has a pH greater than 7.' },
    { term: 'pH', definition: 'A measure of how acidic or basic a substance is on a scale of 0-14.' },
    { term: 'Catalyst', definition: 'A substance that speeds up a chemical reaction without being consumed.' },
    { term: 'Compound', definition: 'A substance formed by chemically bonding two or more elements.' },
    { term: 'Atom', definition: 'The smallest unit of an element.' },
    { term: 'Molecule', definition: 'A group of atoms bonded together.' },
    { term: 'Ion', definition: 'An atom or molecule with a net electrical charge.' },
    { term: 'Isotope', definition: 'Atoms of the same element with different numbers of neutrons.' },
    { term: 'Valence', definition: 'The combining capacity of an element.' },
    { term: 'Stoichiometry', definition: 'The calculation of quantities in chemical reactions.' },
    { term: 'Equilibrium', definition: 'A state where forward and reverse reactions occur at equal rates.' }
  ],
  
  // Interactive Quizzes
  quizzes: [
    {
      id: 'quiz-001',
      title: 'Basic Chemistry Concepts',
      questions: [
        {
          id: 'q1',
          question: 'What is the chemical formula for water?',
          type: 'multiple-choice',
          options: ['H₂O', 'CO₂', 'NaCl', 'O₂'],
          correctAnswer: 'H₂O'
        },
        {
          id: 'q2',
          question: 'Is salt (NaCl) an element or a compound?',
          type: 'multiple-choice',
          options: ['Element', 'Compound', 'Mixture', 'Molecule'],
          correctAnswer: 'Compound'
        },
        {
          id: 'q3',
          question: 'True or False: Acids have a pH greater than 7.',
          type: 'true-false',
          correctAnswer: false
        }
      ]
    },
    {
      id: 'quiz-002',
      title: 'Periodic Table Quiz',
      questions: [
        {
          id: 'q1',
          question: 'What is the atomic number of Carbon?',
          type: 'multiple-choice',
          options: ['4', '6', '8', '12'],
          correctAnswer: '6'
        },
        {
          id: 'q2',
          question: 'What is the symbol for Sodium?',
          type: 'multiple-choice',
          options: ['So', 'Na', 'S', 'Sn'],
          correctAnswer: 'Na'
        }
      ]
    },
    {
      id: 'quiz-003',
      title: 'Reaction Types',
      questions: [
        {
          id: 'q1',
          question: 'In a synthesis reaction: A + B → AB. What is the name of this type of reaction?',
          type: 'multiple-choice',
          options: ['Decomposition', 'Synthesis', 'Displacement', 'Combustion'],
          correctAnswer: 'Synthesis'
        }
      ]
    }
  ],
  
  // Student Learning Progress
  studentProgress: {},
  
  // Methods
  getElementInfo: function(symbol) {
    return this.periodicTable.find(e => e.symbol === symbol);
  },
  
  getGlossaryTerm: function(term) {
    return this.glossary.find(g => g.term.toLowerCase() === term.toLowerCase());
  },
  
  searchGlossary: function(query) {
    const lowerQuery = query.toLowerCase();
    return this.glossary.filter(g => 
      g.term.toLowerCase().includes(lowerQuery) || 
      g.definition.toLowerCase().includes(lowerQuery)
    );
  },
  
  getQuiz: function(quizId) {
    return this.quizzes.find(q => q.id === quizId);
  },
  
  submitQuizAnswer: function(userId, quizId, answers) {
    const quiz = this.getQuiz(quizId);
    if (!quiz) return null;
    
    let score = 0;
    const results = [];
    
    quiz.questions.forEach(question => {
      const userAnswer = answers[question.id];
      const isCorrect = userAnswer === question.correctAnswer;
      
      if (isCorrect) score++;
      
      results.push({
        questionId: question.id,
        question: question.question,
        userAnswer: userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect: isCorrect
      });
    });
    
    const percentage = Math.round((score / quiz.questions.length) * 100);
    
    // Record progress
    if (!this.studentProgress[userId]) {
      this.studentProgress[userId] = {
        lessonsCompleted: [],
        quizzes: []
      };
    }
    
    this.studentProgress[userId].quizzes.push({
      quizId: quizId,
      quizTitle: quiz.title,
      score: score,
      totalQuestions: quiz.questions.length,
      percentage: percentage,
      completedDate: new Date()
    });
    
    return {
      quizId: quizId,
      score: score,
      totalQuestions: quiz.questions.length,
      percentage: percentage,
      results: results
    };
  },
  
  getStudentProgress: function(userId) {
    return this.studentProgress[userId] || null;
  },
  
  recordLessonCompletion: function(userId, lessonId, lessonTitle) {
    if (!this.studentProgress[userId]) {
      this.studentProgress[userId] = {
        lessonsCompleted: [],
        quizzes: []
      };
    }
    
    this.studentProgress[userId].lessonsCompleted.push({
      lessonId: lessonId,
      lessonTitle: lessonTitle,
      completedDate: new Date()
    });
  }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = learningCenter;
}
