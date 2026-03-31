import React from 'react';
import { useParams } from 'react-router-dom';
import UnifiedHeader from '../../components/header/UnifiedHeader';
import Footer from '../../components/footer/footer';
import { ChevronRight, Lightbulb, Code, Users, Briefcase, Award } from 'lucide-react';

const companyData = {
  google: {
    name: "Google",
    tagline: "Innovate. Collaborate. Impact.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", 
    sections: [
      {
        title: "Behavioral Questions",
        icon: <Users />,
        color: "text-blue-600",
        questions: [
          "Tell me about a time you failed.",
          "How do you handle conflict in a team?",
          "Describe a challenging project and how you overcame it.",
          "Why Google? What interests you about this role?",
          "How do you prioritize your work?",
        ]
      },
      {
        title: "Technical Questions (Software Engineering)",
        icon: <Code />,
        color: "text-green-600",
        questions: [
          "Implement a binary search tree and its operations.",
          "Explain the difference between a process and a thread.",
          "Design a system to shorten URLs (like Bitly).",
          "What is polymorphism? Provide an example.",
          "Write a function to find the Nth Fibonacci number.",
        ]
      },
      {
        title: "System Design Questions",
        icon: <Lightbulb />,
        color: "text-purple-600",
        questions: [
          "Design Google Search.",
          "Design a distributed cache system.",
          "Design a ride-sharing service like Uber/Lyft.",
          "How would you design a real-time chat application?",
          "Design a video streaming service.",
        ]
      }
    ]
  },
  amazon: {
    name: "Amazon",
    tagline: "Work Hard. Have Fun. Make History.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    sections: [
      {
        title: "Leadership Principles Questions",
        icon: <Award />,
        color: "text-orange-600",
        questions: [
          "Tell me about a time you had to dive deep to solve a problem.",
          "Describe a situation where you took a calculated risk.",
          "Give an example of a time you had to disagree and commit.",
          "Tell me about a time you showed ownership.",
          "Describe a situation where you innovated on behalf of customers.",
        ]
      },
      {
        title: "Technical Questions (SDE)",
        icon: <Code />,
        color: "text-green-600",
        questions: [
          "Find the Kth largest element in an array.",
          "Implement a queue using two stacks.",
          "Given a list of items with weights and values, find the maximum value you can carry within a given capacity (Knapsack problem).",
          "Explain RESTful APIs.",
          "What are microservices?",
        ]
      },
    ]
  },
  microsoft: {
    name: "Microsoft",
    tagline: "Empower every person and every organization on the planet to achieve more.",
    logo: "https://static.cdnlogo.com/logos/m/21/microsoft_800.png",
    sections: [
      {
        title: "Technical Questions (Software Engineering)",
        icon: <Code />,
        color: "text-green-600",
        questions: [
          "Detect a cycle in a linked list.",
          "Implement a custom hash map.",
          "Design an in-memory file system.",
          "What is the difference between Array and ArrayList in Java?",
          "Explain the CAP theorem.",
        ]
      },
      {
        title: "Behavioral Questions",
        icon: <Users />,
        color: "text-blue-600",
        questions: [
          "Tell me about a time you dealt with an ambiguous situation.",
          "How do you handle pressure and tight deadlines?",
          "Describe a project where you collaborated with others.",
          "Why Microsoft? What do you expect from this role?",
          "Give an example of a time you received constructive criticism.",
        ]
      },
    ]
  },
    apple: {
    name: "Apple",
    tagline: "Think different.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    sections: [
      {
        title: "Product & Design Thinking",
        icon: <Lightbulb />,
        color: "text-purple-600",
        questions: [
          "How would you improve the iPhone camera?",
          "Design an alarm clock for the visually impaired.",
          "What's your favorite Apple product and why?",
          "How do you handle a situation where a product launch is delayed?",
          "Explain a technical concept to a non-technical person.",
        ]
      },
      {
        title: "Technical Questions (Software & Hardware)",
        icon: <Code />,
        color: "text-green-600",
        questions: [
          "Describe your experience with Swift/Objective-C/C++.",
          "Explain memory management in iOS.",
          "Design a power-efficient system.",
          "What are deadlocks and how can they be prevented?",
          "Implement a stack with a `min` function.",
        ]
      },
    ]
  },
  meta: {
    name: "Meta (Facebook)",
    tagline: "Bring the world closer together.",
    logo: "https://static.cdnlogo.com/logos/m/42/meta_800.png",
    sections: [
      {
        title: "Behavioral & Culture Fit",
        icon: <Users />,
        color: "text-blue-600",
        questions: [
          "Tell me about a time you moved fast and broke things (and what you learned).",
          "How do you approach scaling a feature to billions of users?",
          "Describe a situation where you had to influence without authority.",
          "What excites you about working at Meta?",
          "How do you get feedback on your work?",
        ]
      },
      {
        title: "Technical Questions (Software Engineering)",
        icon: <Code />,
        color: "text-green-600",
        questions: [
          "Find all valid permutations of a string.",
          "Design a News Feed system.",
          "Implement a trie data structure.",
          "Explain eventual consistency.",
          "How would you detect and prevent abuse on a social media platform?",
        ]
      },
    ]
  },
  netflix: {
    name: "Netflix",
    tagline: "Entertainment for everyone, everywhere.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    sections: [
      {
        title: "Culture & Responsibility Questions",
        icon: <Briefcase />,
        color: "text-gray-600",
        questions: [
          "Tell me about a time you had to challenge a senior colleague's decision.",
          "Describe a project where you had complete ownership and autonomy.",
          "How do you handle a situation where a project goes off track?",
          "What is your philosophy on 'freedom and responsibility'?",
          "How do you provide candid feedback?",
        ]
      },
      {
        title: "Technical Questions (Cloud & Distributed Systems)",
        icon: <Code />,
        color: "text-green-600",
        questions: [
          "Design a video recommendation system.",
          "How do you ensure high availability and fault tolerance?",
          "Explain different types of databases and when to use them.",
          "What are the challenges of microservices architecture?",
          "Describe your experience with AWS/Azure/GCP.",
        ]
      },
    ]
  },
};

const CompanyDetails = () => {
  const { companyId } = useParams();
  const company = companyData[companyId];

  if (!company) {
    return (
      <>
        <UnifiedHeader />
        <div className="min-h-screen bg-[#f4f7fa] font-sans flex items-center justify-center">
          <h1 className="text-3xl font-bold text-gray-800">Company Not Found</h1>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7fa] font-sans">
      <UnifiedHeader />

      <div className="pt-[85px]"> 
       
        <div className="bg-[#1a2b4b] py-20 px-6 relative overflow-hidden text-white">
          <div className="max-w-6xl mx-auto text-center">
          
          <img src={company.logo} alt={company.name} className="h-24 mx-auto mb-6 object-contain" />
          <h1 className="text-4xl md::text-5xl font-bold mt-4 leading-tight">
            {company.name} Interview <span className="text-blue-400">Guide</span>
          </h1>
          <p className="text-gray-300 mt-4 text-lg leading-relaxed max-w-2xl mx-auto">
            {company.tagline}
          </p>
        </div>
      </div>

      {/* Questions Sections */}
      <div className="max-w-6xl mx-auto py-16 px-6">
        {company.sections.map((section, sectionIdx) => (
          <div key={sectionIdx} className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className={`p-2 rounded-full bg-blue-100 ${section.color}`}>{section.icon}</span>
              {section.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.questions.map((question, qIdx) => (
                <div key={qIdx} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex items-start gap-3">
                  <ChevronRight size={20} className="text-blue-600 shrink-0 mt-1" />
                  <p className="text-gray-700 font-medium">{question}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      </div> {/* Closing div for pt-[85px] wrapper */}
      <Footer />
    </div>
  );
};

export default CompanyDetails;