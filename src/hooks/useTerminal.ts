import { useState, useEffect, useCallback } from 'react';
import { Command } from '../types/terminal';
import { portfolioData } from '../data/portfolio';
import { useSoundEffects } from './useSoundEffects';

const availableCommands = [
  'help', 'whoami', 'about', 'skills', 'projects', 'experience', 
  'education', 'contact', 'resume', 'clear', 'ls', 'cat', 'echo', 'theme'
];

export const useTerminal = () => {
  const [history, setHistory] = useState<Command[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const { playTyping, playCommand, playError } = useSoundEffects();

  // Welcome message
  useEffect(() => {
    const welcomeCommand: Command = {
      command: 'init',
      output: `Welcome to ${portfolioData.name}'s Portfolio Terminal
Type 'help' to see available commands.
      
 ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
 █  ${portfolioData.name} - ${portfolioData.title}  █
 ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀`,
      timestamp: new Date()
    };
    setHistory([welcomeCommand]);
  }, []);

  const simulateDownload = useCallback(() => {
    setIsDownloading(true);
    setDownloadProgress(0);
    
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          // Simulate actual download
          const link = document.createElement('a');
          link.href = 'data:text/plain;charset=utf-8,This would be the actual resume PDF content';
          link.download = `${portfolioData.name.replace(' ', '_')}_Resume.pdf`;
          link.click();
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);
  }, []);

  const processCommand = useCallback(async (input: string) => {
    const command = input.trim().toLowerCase();
    const args = command.split(' ');
    const baseCommand = args[0];

    let output: string | JSX.Element = '';
    let isError = false;

    switch (baseCommand) {
      case 'help':
        output = `Available commands:

  whoami      - Display user information
  about       - Show bio and introduction
  skills      - List technical skills
  projects    - Show project portfolio
  experience  - Display work experience
  education   - Show educational background
  contact     - Get contact information
  resume      - Download resume with progress
  theme       - Change terminal theme (green|blue|amber|purple|red)
  ls          - List directory contents
  cat <file>  - Display file contents
  echo <text> - Display text
  clear       - Clear terminal history
  
Type any command to get started!`;
        break;

      case 'whoami':
        output = `${portfolioData.name}
${portfolioData.title}
📍 ${portfolioData.location}
🌐 ${portfolioData.website}`;
        break;

      case 'about':
        output = `About ${portfolioData.name}:

${portfolioData.bio}

🎯 Specializing in modern web technologies
🚀 Passionate about clean code and user experience
💡 Always learning and exploring new technologies`;
        break;

      case 'skills':
        output = `Technical Skills:

🔤 Languages:
   ${portfolioData.skills.languages.join(' • ')}

⚛️ Frameworks & Libraries:
   ${portfolioData.skills.frameworks.join(' • ')}

🛠️ Tools & Technologies:
   ${portfolioData.skills.tools.join(' • ')}

🗄️ Databases:
   ${portfolioData.skills.databases.join(' • ')}`;
        break;

      case 'projects':
        output = `Featured Projects:

${portfolioData.projects.map((project, index) => `
${index + 1}. ${project.name}
   ${project.description}
   
   Tech Stack: ${project.tech.join(', ')}
   ${project.github ? `🔗 GitHub: ${project.github}` : ''}
   ${project.demo ? `🌐 Demo: ${project.demo}` : ''}
`).join('\n')}`;
        break;

      case 'experience':
        output = `Work Experience:

${portfolioData.experience.map((exp, index) => `
${index + 1}. ${exp.position} @ ${exp.company}
   Duration: ${exp.duration}
   
   ${exp.description}
`).join('\n')}`;
        break;

      case 'education':
        output = `Education:

${portfolioData.education.map((edu, index) => `
${index + 1}. ${edu.degree}
   ${edu.institution} - ${edu.year}
`).join('\n')}`;
        break;

      case 'contact':
        output = `Contact Information:

📧 Email: ${portfolioData.email}
📱 Phone: ${portfolioData.phone}
🌐 Website: ${portfolioData.website}
💼 LinkedIn: ${portfolioData.linkedin}
🐙 GitHub: ${portfolioData.github}
📍 Location: ${portfolioData.location}

Feel free to reach out for opportunities or collaborations!`;
        break;

      case 'resume':
        output = '📄 Preparing resume download...';
        setTimeout(() => {
          simulateDownload();
        }, 500);
        break;

      case 'theme':
        if (args[1]) {
          const theme = args[1];
          const validThemes = ['green', 'blue', 'amber', 'purple', 'red'];
          if (validThemes.includes(theme)) {
            // Dispatch custom event for theme change
            window.dispatchEvent(new CustomEvent('themeChange', { detail: theme }));
            output = `🎨 Theme changed to ${theme}`;
          } else {
            output = `❌ Invalid theme. Available themes: ${validThemes.join(', ')}`;
            isError = true;
          }
        } else {
          output = `Current themes available: green, blue, amber, purple, red
Usage: theme <color>`;
        }
        break;

      case 'ls':
        output = `total 8
drwxr-xr-x  2 alex alex 4096 Dec 15 10:30 projects/
drwxr-xr-x  2 alex alex 4096 Dec 15 10:30 skills/
-rw-r--r--  1 alex alex 1024 Dec 15 10:30 about.txt
-rw-r--r--  1 alex alex 2048 Dec 15 10:30 resume.pdf
-rw-r--r--  1 alex alex  512 Dec 15 10:30 contact.txt`;
        break;

      case 'cat':
        if (args[1]) {
          const filename = args[1];
          switch (filename) {
            case 'about.txt':
              output = portfolioData.bio;
              break;
            case 'contact.txt':
              output = `Name: ${portfolioData.name}
Email: ${portfolioData.email}
Phone: ${portfolioData.phone}`;
              break;
            default:
              output = `cat: ${filename}: No such file or directory`;
              isError = true;
          }
        } else {
          output = 'cat: missing file operand';
          isError = true;
        }
        break;

      case 'echo':
        output = args.slice(1).join(' ') || '';
        break;

      case 'clear':
        setHistory([]);
        playCommand();
        return;

      default:
        output = `Command not found: ${baseCommand}. Type 'help' for available commands.`;
        isError = true;
    }

    // Play appropriate sound effect
    if (isError) {
      playError();
    } else {
      playCommand();
    }

    const newCommand: Command = {
      command: input,
      output,
      timestamp: new Date()
    };

    setHistory(prev => [...prev, newCommand]);
  }, [simulateDownload, playCommand, playError]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Play typing sound for regular keys
    if (e.key.length === 1 || e.key === 'Backspace') {
      playTyping();
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      if (currentInput.trim()) {
        setIsTyping(true);
        processCommand(currentInput);
        setCurrentInput('');
        setHistoryIndex(-1);
        setTimeout(() => setIsTyping(false), 100);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const commandHistory = history.filter(cmd => cmd.command !== 'init').map(cmd => cmd.command);
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const commandHistory = history.filter(cmd => cmd.command !== 'init').map(cmd => cmd.command);
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const matches = availableCommands.filter(cmd => cmd.startsWith(currentInput.toLowerCase()));
      if (matches.length === 1) {
        setCurrentInput(matches[0]);
      }
    }
  };

  return {
    history,
    currentInput,
    setCurrentInput,
    handleKeyDown,
    isTyping,
    processCommand,
    isDownloading,
    downloadProgress
  };
};