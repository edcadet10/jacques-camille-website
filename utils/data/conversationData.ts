// Conversation data for Jacques Evens Camille website

// Predefined Questions
export interface QuestionAnswer {
  id: string;
  question: string;
  answer: string;
  category: string;
}

// Topic interface for suggested topics
export interface Topic {
  id: string;
  text: string;
  query: string;
}

// Comprehensive set of questions and answers based on Jacques' profile
export const questionsAnswers: QuestionAnswer[] = [
  // Background and Personal Questions
  {
    id: 'background-origin',
    question: 'Where are you from originally?',
    answer: 'I am a Caribbean native with deep Haitian roots. This multicultural heritage has significantly shaped my approach to leadership and organizational development, providing me with a global perspective that appreciates diverse cultural contexts.',
    category: 'background'
  },
  {
    id: 'background-current',
    question: 'Where are you based now?',
    answer: 'I currently reside in Kigali, Rwanda, where I work with leaders across East Africa. Living in Rwanda has enriched my understanding of the region\'s unique leadership challenges and opportunities, informing my coaching and consultancy work.',
    category: 'background'
  },
  {
    id: 'background-languages',
    question: 'What languages do you speak?',
    answer: 'I\'m fluent in English, French, and Haitian Creole at a native level. I also have professional working proficiency in Spanish, elementary proficiency in Kinyarwanda, and a basic understanding of Kiswahili. This linguistic versatility allows me to work effectively across different cultural contexts and build deeper connections with clients from various backgrounds.',
    category: 'background'
  },
  {
    id: 'background-journey',
    question: 'How did you end up in Rwanda?',
    answer: 'My journey to Rwanda was driven by a desire to contribute to the remarkable development story taking place in East Africa. After my experience in Haiti and further education, I was drawn to Rwanda\'s unique approach to governance and development. The opportunity to work with Leadership Management International (LMI) East Africa allowed me to apply my expertise in a new context while continuing to grow professionally.',
    category: 'background'
  },

  // Education Questions
  {
    id: 'education-degrees',
    question: 'What degrees do you hold?',
    answer: 'I hold an MBA in Project Management from Universidad Católica San Antonio de Murcia (UCAM), completed between 2022-2023, and a Master of Social Work in International Cooperation and Humanitarian Aid from KALU Institute, completed between 2018-2021. I also studied Administration and Management at Institut National d\'Administration, de Gestion et des Hautes Études Internationales (INAGHEI) in Haiti.',
    category: 'education'
  },
  {
    id: 'education-mba',
    question: 'Tell me about your MBA program',
    answer: 'My MBA in Project Management from Universidad Católica San Antonio de Murcia (UCAM) focused on Strategic Management and Leadership, Strategic Project Management, International Human Resource Management, Operations Management, and Strategic Change Management. This program enhanced my ability to design and implement effective organizational strategies and lead complex projects.',
    category: 'education'
  },
  {
    id: 'education-msw',
    question: 'What did you study in your Master of Social Work?',
    answer: 'My Master of Social Work from KALU Institute specialized in International Cooperation and Humanitarian Aid. The program covered Logical Framework Analysis, SPHERE Standards, and related humanitarian practices. This education provided me with a strong foundation in designing and evaluating social interventions, understanding humanitarian principles, and implementing effective aid programs.',
    category: 'education'
  },
  {
    id: 'education-certifications',
    question: 'What professional certifications do you have?',
    answer: 'I am a Certified Executive Leadership Coach with formal training in coaching senior leaders. I also hold certifications in Effective Personal Productivity (EPP) from Leadership Management International, Economic Diplomacy from DiploFoundation, and various technical leadership and advanced competitive strategy certifications. These credentials reflect my commitment to continuous professional development and excellence in my field.',
    category: 'education'
  },

  // Professional Experience Questions
  {
    id: 'experience-current',
    question: 'What is your current role?',
    answer: 'I currently serve as an Executive Leadership Coach & Organizational Development Consultant with Leadership Management International (LMI) East Africa. In this role, I provide tailored executive coaching and capacity-building support to senior leaders across public and private sectors in Rwanda and East Africa. I design leadership programs that enhance personal productivity, strategic planning, team development, and overall organizational transformation.',
    category: 'experience'
  },
  {
    id: 'experience-bms',
    question: 'What is the BMS75000:2020 standard you work with?',
    answer: 'I act as the sole agent responsible for promoting and implementing the Business Management Standard BMS75000:2020 in Rwanda. This standard provides a comprehensive framework for strengthening corporate governance and operational excellence. My work involves helping organizations align their practices with this standard to enhance their management systems, decision-making processes, and overall organizational performance.',
    category: 'experience'
  },
  {
    id: 'experience-haiti',
    question: 'What was your role at Entrepreneurs du Monde in Haiti?',
    answer: 'At Entrepreneurs du Monde in Haiti, I served as the Head of Training for SMEs and External Services from 2014 to 2016. I designed, coordinated, and evaluated training programs aimed at empowering entrepreneurs and small to medium-sized enterprises. I also managed partnerships with organizations such as Caritas Suisse, UMCOR, and the UN Development Programme, leading workshops on project evaluation, strategic planning, and capacity building.',
    category: 'experience'
  },
  {
    id: 'experience-etre',
    question: 'What did you do at ETRE Ayisyen Institut Entrepreneurial?',
    answer: 'At ETRE Ayisyen Institut Entrepreneurial in Haiti, I served as the Educational Director and Full-Time Instructor. I oversaw the pedagogical coordination of school programs designed to foster youth entrepreneurship, developed and delivered meticulously prepared courses and training modules, and supervised teams of trainers to ensure quality, engagement, and a collaborative learning environment.',
    category: 'experience'
  },
  {
    id: 'experience-fireside',
    question: 'What are the fireside chats you host?',
    answer: 'I host fireside chats and workshops with industry experts, such as banking veteran Nigel Chanakira, to explore innovative solutions in leadership and market development. These interactive sessions provide a platform for knowledge sharing, networking, and collaborative problem-solving. They bring together professionals from various sectors to discuss contemporary challenges and opportunities in leadership and organizational development.',
    category: 'experience'
  },

  // Services Questions
  {
    id: 'services-overview',
    question: 'What services do you offer?',
    answer: 'I offer a comprehensive range of services including Executive Leadership Coaching, Organizational Development, Strategic Planning, Team Development, Project Management, and Capacity Building. Each service is tailored to meet the specific needs of my clients and designed to create sustainable transformation in both leaders and organizations. My integrated approach ensures that individual leadership development aligns with broader organizational goals.',
    category: 'services'
  },
  {
    id: 'services-coaching',
    question: 'How does your executive coaching work?',
    answer: 'My executive coaching approach is personalized and focuses on enhancing leadership capabilities, strategic thinking, and personal effectiveness. I work one-on-one with senior leaders through structured coaching sessions that typically include assessment, goal setting, action planning, and ongoing support. The process is confidential, challenging yet supportive, and designed to achieve measurable improvements in leadership effectiveness and organizational impact.',
    category: 'services'
  },
  {
    id: 'services-organizational',
    question: 'What does your organizational development service involve?',
    answer: 'My organizational development services involve comprehensive interventions to transform organizational structures, processes, and culture. I conduct thorough organizational assessments, identify areas for improvement, design tailored interventions, and support implementation. My approach focuses on creating sustainable changes that improve performance, employee engagement, and overall organizational health, always aligning with your strategic objectives and organizational values.',
    category: 'services'
  },
  {
    id: 'services-strategic',
    question: 'How do you approach strategic planning?',
    answer: 'My strategic planning services help organizations develop and implement effective plans aligned with their vision and goals. I guide leaders through a comprehensive process that includes environmental scanning, stakeholder engagement, goal setting, strategy formulation, and implementation planning. The result is a clear roadmap for success that accounts for internal capabilities, external factors, and resource constraints, ensuring that your strategic plan is both ambitious and achievable.',
    category: 'services'
  },
  {
    id: 'services-team',
    question: 'How do you develop teams?',
    answer: 'I offer specialized programs to enhance team cohesion, communication, and performance. These interventions are designed to build trust, improve collaboration, and align team efforts with organizational goals. Through workshops, coaching sessions, and team-building activities, I help teams overcome challenges, leverage their strengths, and develop the skills needed for high performance. My approach fosters a positive and productive team environment, whether forming a new team or enhancing an existing one.',
    category: 'services'
  },
  {
    id: 'services-women',
    question: 'What is your Leadership for Women program?',
    answer: 'My "Leadership for Women" program is a transformative initiative designed specifically to empower women leaders through dedicated mentoring and specialized training. The program addresses the unique challenges women face in leadership positions and provides targeted strategies for overcoming these obstacles. It focuses on building confidence, developing strategic communication skills, enhancing resilience, and creating supportive networks that contribute to long-term professional success.',
    category: 'services'
  },

  // Methodology and Approach Questions
  {
    id: 'methodology-approach',
    question: 'What is your coaching methodology?',
    answer: 'My coaching methodology combines evidence-based approaches from leadership theories, organizational psychology, and practical business applications. I focus on creating actionable development plans, providing ongoing support, and measuring tangible results. The process typically includes assessment, goal setting, skill development, practical application, and continuous evaluation. I believe in both challenging and supporting my clients throughout their transformation journey.',
    category: 'methodology'
  },
  {
    id: 'methodology-total-leader',
    question: 'What is The Total Leader® Process you advocate?',
    answer: 'The Total Leader® Process is a holistic approach to leadership development that integrates personal growth with organizational success. It focuses on four key dimensions: personal productivity, strategic leadership, team development, and motivational leadership. This comprehensive framework ensures that leaders develop the full spectrum of skills needed to excel in today\'s complex business environment, creating sustainable results both for themselves and their organizations.',
    category: 'methodology'
  },
  {
    id: 'methodology-values',
    question: 'What values guide your work?',
    answer: 'My work is guided by core values of integrity, excellence, cultural sensitivity, and sustainable impact. I believe in creating meaningful change that respects local contexts while implementing global best practices. I approach each engagement with deep respect for clients\' unique circumstances, maintain the highest ethical standards, and focus on empowering rather than creating dependency. These values ensure that my interventions have positive, lasting effects.',
    category: 'methodology'
  },
  {
    id: 'methodology-measure',
    question: 'How do you measure the success of your interventions?',
    answer: 'I measure success through a combination of quantitative and qualitative metrics tailored to each client\'s objectives. For individual coaching, this may include leadership assessments, 360-degree feedback, and achievement of specific development goals. For organizational interventions, metrics might include improvements in employee engagement, operational efficiency, and strategic goal attainment. I establish clear success criteria at the outset and conduct regular reviews to track progress and make adjustments as needed.',
    category: 'methodology'
  },
  {
    id: 'methodology-unique',
    question: 'What makes your approach unique?',
    answer: 'My approach is distinguished by three key elements: my multicultural perspective from working across the Caribbean and Africa, my integrated background in business and social development, and my focus on sustainable transformation rather than quick fixes. I combine rigorous analytical methods with deep empathy, cultural sensitivity, and practical experience. This unique blend allows me to connect with leaders from diverse backgrounds and develop solutions that respect local contexts while implementing global best practices.',
    category: 'methodology'
  },

  // Projects and Achievements Questions
  {
    id: 'projects-notable',
    question: 'What are some of your notable projects?',
    answer: 'Among my notable projects is being the sole agent responsible for implementing the Business Management Standard BMS75000:2020 in Rwanda, strengthening corporate governance across multiple organizations. I\'ve also designed and delivered transformative leadership programs for public sector executives, facilitated strategic planning sessions for multinational organizations, and led capacity-building initiatives that have empowered hundreds of entrepreneurs and SMEs across Haiti and East Africa.',
    category: 'projects'
  },
  {
    id: 'projects-proud',
    question: 'What achievement are you most proud of?',
    answer: 'I\'m most proud of the sustainable impact of my leadership development programs, particularly seeing the transformation in leaders who have gone on to create positive change in their organizations and communities. The ripple effect of empowering a leader extends far beyond individual growth, often leading to improved organizational performance, job creation, and community development. These lasting impacts that continue long after my direct involvement are the most meaningful measures of success in my work.',
    category: 'projects'
  },
  {
    id: 'projects-haiti',
    question: 'What impact did your work in Haiti have?',
    answer: 'My work in Haiti with Entrepreneurs du Monde and ETRE Ayisyen Institut Entrepreneurial had significant impact in empowering local entrepreneurs and building sustainable businesses. The training programs I designed and implemented helped hundreds of small business owners develop essential skills in financial management, strategic planning, and business operations. Many of these entrepreneurs went on to expand their businesses, create jobs, and contribute to local economic development, demonstrating the sustainable impact of capacity building.',
    category: 'projects'
  },
  {
    id: 'projects-challenges',
    question: 'What are the biggest challenges you\'ve overcome?',
    answer: 'One of the biggest challenges I\'ve overcome was adapting my leadership development approaches to work effectively across highly diverse cultural contexts, from Haiti to Rwanda. This required deep cultural immersion, continuous learning, and the ability to translate leadership principles into locally relevant frameworks. Another significant challenge has been helping organizations navigate complex change during periods of economic and political uncertainty, which demanded both technical expertise and emotional intelligence.',
    category: 'projects'
  },

  // Personal Development Questions
  {
    id: 'personal-growth',
    question: 'How do you continue to develop yourself as a coach?',
    answer: 'I maintain a disciplined practice of continuous professional development through a combination of formal education, certification programs, peer supervision, and reflective practice. I regularly attend leadership conferences, participate in coaching communities of practice, read extensively in my field, and seek feedback from clients. I also practice what I preach by working with my own coach to ensure I continue growing both professionally and personally.',
    category: 'personal'
  },
  {
    id: 'personal-inspiration',
    question: 'Who are your leadership role models?',
    answer: 'My leadership role models come from diverse backgrounds and include both global figures and mentors I\'ve personally worked with. I draw inspiration from transformational leaders like Nelson Mandela for his reconciliation vision, Rwanda\'s President Paul Kagame for his strategic approach to nation-building, and business innovators who combine commercial success with social impact. I also deeply value the mentors who have shaped my journey by modeling integrity, cultural intelligence, and a commitment to continuous learning.',
    category: 'personal'
  },
  {
    id: 'personal-leadership',
    question: 'What leadership books do you recommend?',
    answer: 'I recommend a diverse reading list that includes classics like "Leadership on the Line" by Heifetz and Linsky for adaptive leadership, "Servant Leadership" by Robert Greenleaf, and "Start with Why" by Simon Sinek. For cross-cultural leadership contexts, "The Culture Map" by Erin Meyer is excellent. I also value "Mindset" by Carol Dweck for personal development and "Reinventing Organizations" by Frederic Laloux for organizational transformation. These works offer complementary perspectives on effective leadership in today\'s complex environment.',
    category: 'personal'
  },
  {
    id: 'personal-future',
    question: 'What are your future professional goals?',
    answer: 'Looking ahead, I aim to expand my impact by developing innovative leadership programs specifically designed for the African context, publishing research on cross-cultural leadership effectiveness, and mentoring the next generation of leadership coaches. I\'m particularly interested in exploring how traditional African leadership philosophies can be integrated with contemporary leadership practices to create more authentic and effective leadership models for the continent\'s future leaders.',
    category: 'personal'
  },

  // Contact and Engagement Questions
  {
    id: 'contact-process',
    question: 'How can someone work with you?',
    answer: 'To work with me, the process typically begins with an initial consultation to discuss your specific needs and objectives. You can reach out through the contact form on this website, connect with me on LinkedIn, or send me an email. After our initial conversation, I\'ll propose a tailored approach based on your unique situation. For coaching engagements, we typically start with an assessment phase before developing a customized program. For organizational interventions, I often begin with a discovery process to understand your specific challenges and opportunities.',
    category: 'contact'
  },
  {
    id: 'contact-clientele',
    question: 'Who are your typical clients?',
    answer: 'My clientele spans both public and private sectors across East Africa, primarily in Rwanda. I work with senior executives, government officials, entrepreneurs, and emerging leaders who are driving significant initiatives within their organizations. My clients typically share a commitment to continuous improvement, a desire to create positive change, and the willingness to engage in meaningful personal and organizational development. The diversity of my client base enriches my practice and allows for valuable cross-sector insights.',
    category: 'contact'
  },
  {
    id: 'contact-industries',
    question: 'What industries do you work with?',
    answer: 'I work across a wide range of industries including financial services, telecommunications, manufacturing, education, healthcare, and public administration. This cross-sector experience allows me to bring diverse perspectives and best practices to each engagement. While the technical contexts may differ, the fundamental leadership and organizational development principles remain consistent, though always adapted to the specific industry context and organizational culture.',
    category: 'contact'
  },
  {
    id: 'contact-location',
    question: 'Do you work remotely or only in Rwanda?',
    answer: 'While I\'m based in Kigali, Rwanda, I offer both in-person and remote coaching and consulting services. I work throughout East Africa and can accommodate virtual engagements with clients globally. For organizational development work that benefits from on-site presence, I typically travel within the region. My approach is flexible and can be tailored to your specific needs and location constraints.',
    category: 'contact'
  },
  {
    id: 'contact-firstmeeting',
    question: 'What happens in the first meeting?',
    answer: 'The first meeting is an opportunity for us to explore your specific needs, objectives, and context. I\'ll ask questions to understand your current situation, challenges, and aspirations. We\'ll discuss your leadership journey, organizational context, and specific goals. This initial consultation helps establish rapport, clarify expectations, and determine if we\'re a good fit for working together. Based on this conversation, I can then propose a tailored approach to address your specific situation.',
    category: 'contact'
  },

  // Default response for unmatched questions
  {
    id: 'default-contact',
    question: '',
    answer: 'Thank you for your interest in my work. That\'s a great question that would benefit from a more personalized discussion. I\'d be happy to address this in more detail during a direct conversation. Please use the contact form below to schedule a call, or connect with me on LinkedIn. I look forward to the opportunity to discuss how I might support you or your organization.',
    category: 'default'
  }
];

// Suggested topics for the conversation interface
export const suggestedTopics: Topic[] = [
  { id: 'background', text: 'Your Background', query: 'Where are you from originally?' },
  { id: 'experience', text: 'Current Role', query: 'What is your current role?' },
  { id: 'services', text: 'Services Offered', query: 'What services do you offer?' },
  { id: 'methodology', text: 'Coaching Approach', query: 'What is your coaching methodology?' },
  { id: 'languages', text: 'Languages', query: 'What languages do you speak?' },
  { id: 'contact', text: 'Working Together', query: 'How can someone work with you?' }
];

// Function to find the best matching response based on user input
export const findBestMatch = (userInput: string): string => {
  if (!userInput || typeof userInput !== 'string') {
    return "I'm not sure I understand your question. Could you please rephrase it or select one of the suggested topics?";
  }
  
  // Sanitize and normalize input
  const input = userInput.trim().toLowerCase();
  if (!input) {
    return "I'm not sure I understand your question. Could you please rephrase it or select one of the suggested topics?";
  }
  
  // Check for exact matches with questions
  for (const qa of questionsAnswers) {
    if (qa.question.toLowerCase() === input) {
      return qa.answer;
    }
  }
  
  // Check for keyword matches
  let bestMatch: QuestionAnswer | null = null;
  let highestScore = 0;
  
  for (const qa of questionsAnswers) {
    if (qa.id === 'default-contact') continue; // Skip the default response in scoring
    
    let score = 0;
    const keywords = [...qa.question.toLowerCase().split(' '), ...qa.category.split(',')];
    
    for (const keyword of keywords) {
      if (keyword.length > 3 && input.includes(keyword)) { // Only count keywords longer than 3 chars
        score += 1;
        // Bonus points for category matches
        if (qa.category.toLowerCase().includes(keyword)) {
          score += 0.5;
        }
      }
    }
    
    if (score > highestScore) {
      highestScore = score;
      bestMatch = qa;
    }
  }
  
  // Return the best match or default response if no good match found
  return (bestMatch && highestScore > 1) 
    ? bestMatch.answer 
    : questionsAnswers.find(qa => qa.id === 'default-contact')?.answer || 
      "I'm not sure I understand your question. Could you please rephrase it or select one of the suggested topics?";
};
