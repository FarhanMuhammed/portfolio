// Custom Javascript for Muhammed Farhan A S Portfolio

document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const navLinks = document.querySelector(".nav-links");

    mobileMenuBtn.addEventListener("click", () => {
        navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
        mobileMenuBtn.classList.toggle("active");
        if (navLinks.style.display === "flex") {
            navLinks.style.flexDirection = "column";
            navLinks.style.position = "absolute";
            navLinks.style.top = "70px";
            navLinks.style.left = "0";
            navLinks.style.width = "100%";
            navLinks.style.background = "rgba(8, 12, 20, 0.95)";
            navLinks.style.padding = "20px";
            navLinks.style.borderBottom = "1px solid var(--border-color)";
        }
    });

    // 2. Terminal Typing Simulation
    const terminalLines = [
        { type: "input", text: "whoami" },
        { type: "output", text: "Muhammed Farhan A S // MSc Cyber Forensics Student & OCSP Certified Security Analyst." },
        { type: "input", text: "cat competencies.cfg" },
        { type: "output", text: "Analyzing domains... Network Security [OK], Digital Forensics [OK], OSINT [OK], Cryptography [OK], Steganography [OK]." },
        { type: "input", text: "cat projects_index.log" },
        { type: "output", text: "5 active records found: [LogX-Ray], [TrueTrace SDEM], [Seafarer Voyage], [Colour My World], [Heal Space]." },
        { type: "input", text: "./init_lab.sh --status" },
        { type: "success", text: "System fully online. Interactive simulation modules loaded successfully. Ready to analyze evidence." }
    ];

    const terminalBody = document.getElementById("hero-terminal-body");
    let currentLineIndex = 0;
    
    function writeTerminalLines() {
        if (currentLineIndex >= terminalLines.length) return;
        
        const lineData = terminalLines[currentLineIndex];
        const lineDiv = document.createElement("div");
        lineDiv.className = "terminal-row";
        
        if (lineData.type === "input") {
            lineDiv.innerHTML = `<span class="term-prompt">farhan@forensics-lab:~$</span> <span class="typing-text-field"></span>`;
            terminalBody.appendChild(lineDiv);
            const span = lineDiv.querySelector(".typing-text-field");
            let charIndex = 0;
            
            function typeChar() {
                if (charIndex < lineData.text.length) {
                    span.textContent += lineData.text[charIndex];
                    charIndex++;
                    setTimeout(typeChar, 40);
                } else {
                    currentLineIndex++;
                    setTimeout(writeTerminalLines, 600);
                }
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
            typeChar();
        } else {
            // Output lines (simulated direct response)
            let colorClass = "term-output";
            if (lineData.type === "success") colorClass = "term-success";
            if (lineData.type === "alert") colorClass = "term-alert";
            
            lineDiv.innerHTML = `<span class="${colorClass}">${lineData.text}</span>`;
            terminalBody.appendChild(lineDiv);
            currentLineIndex++;
            terminalBody.scrollTop = terminalBody.scrollHeight;
            setTimeout(writeTerminalLines, 800);
        }
    }

    // Initialize Hero typing
    setTimeout(writeTerminalLines, 1000);

    // 3. Scroll Reveal Animations
    const revealElements = document.querySelectorAll(".scroll-reveal");
    
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const elemTop = rect.top;
            const elemBottom = rect.bottom;
            
            // Only reveal when it starts appearing in viewport
            if (elemTop < window.innerHeight - 50) {
                el.classList.add("revealed");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Initial check

    // 4. Project Filters
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            projectCards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filterValue === "all" || category === filterValue) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // 5. Interactive Forensic Sandbox Lab Monitor
    const monitorScreen = document.getElementById("lab-monitor-screen");
    const clearBtn = document.getElementById("clear-log-btn");
    
    const btnScanNetwork = document.getElementById("btn-scan-network");
    const btnCheckHashes = document.getElementById("btn-check-hashes");
    const btnExtractStego = document.getElementById("btn-extract-stego");
    const btnSystemScan = document.getElementById("btn-system-scan");

    // Clear logs helper
    clearBtn.addEventListener("click", () => {
        monitorScreen.innerHTML = `<div class="monitor-line system-line">[SYSTEM] Console monitor buffer cleared. Awaiting task selection.</div>`;
    });

    const addMonitorLine = (text, type = "info") => {
        const line = document.createElement("div");
        line.className = `monitor-line ${type}-line`;
        line.textContent = text;
        monitorScreen.appendChild(line);
        monitorScreen.scrollTop = monitorScreen.scrollHeight;
    };

    // Simulation Runners
    const runSim = (lines, delay = 500) => {
        let step = 0;
        const interval = setInterval(() => {
            if (step < lines.length) {
                addMonitorLine(lines[step].text, lines[step].type);
                step++;
            } else {
                clearInterval(interval);
            }
        }, delay);
    };

    btnScanNetwork.addEventListener("click", () => {
        addMonitorLine("[>] EXECUTING PROBE: Network Packet Capture & Header Sniffing Scan...", "system");
        
        const simLines = [
            { text: "[+] Initializing PCAP interface node...", type: "info" },
            { text: "[+] Listening for packets on eth0 (192.168.1.100)...", type: "info" },
            { text: "[+] Sniffing packet payload buffers...", type: "info" },
            { text: "[!] WARNING: Flagged TCP SYN flood attempt detected!", type: "warning" },
            { text: "[!] Source IP: 185.220.101.4 | Target Port: 80 (HTTP)", type: "warning" },
            { text: "[+] Feeding payload into LogX-Ray ingestion module...", type: "info" },
            { text: "[SUCCESS] Alert registered. Firewall rules updated. Network stable.", type: "success" }
        ];
        
        runSim(simLines, 600);
    });

    btnCheckHashes.addEventListener("click", () => {
        addMonitorLine("[>] EXECUTING PROBE: Cryptographic Chain of Custody & Hash Audit...", "system");
        
        const simLines = [
            { text: "[+] Loading digital evidence container: case_id_9824.ad1", type: "info" },
            { text: "[+] Extracting target item: system_dump.raw", type: "info" },
            { text: "[+] Calculating message digest using SHA-256 algorithm...", type: "info" },
            { text: "[+] Computed Hash: f6b4c8038e4a9bc8d7b322a3d76e481b288c3a9d4b6c3182b85e051b85721a9c", type: "info" },
            { text: "[+] Validating RSA-2048 Digital Signature on evidence entry...", type: "info" },
            { text: "[SUCCESS] Cryptographic signature matches. Integrity checked. No modification detected.", type: "success" }
        ];
        
        runSim(simLines, 600);
    });

    btnExtractStego.addEventListener("click", () => {
        addMonitorLine("[>] EXECUTING PROBE: Least Significant Bit (LSB) Steganographic Retrieval...", "system");
        
        const simLines = [
            { text: "[+] Ingesting image artifact: blueprint_secret.png", type: "info" },
            { text: "[+] Mapping pixel grid colors (RGB format)...", type: "info" },
            { text: "[+] Extracting hidden LSB bits from blue channel array...", type: "info" },
            { text: "[+] Reassembling bitstream stream...", type: "info" },
            { text: "[!] Decrypted Message Found: 'CASE_RESTRICTED: EVIDENCE_ID_083'", type: "warning" },
            { text: "[SUCCESS] Watermark signature validated successfully: TrueTrace SDEM verified.", type: "success" }
        ];
        
        runSim(simLines, 600);
    });

    btnSystemScan.addEventListener("click", () => {
        addMonitorLine("[>] RUNNING COMPLETE NODE DIAGNOSTIC SCAN...", "danger");
        
        const simLines = [
            { text: "[*] Initiating validation of system directory and structures...", type: "info" },
            { text: "[+] Reading index.html header metadata... OK", type: "info" },
            { text: "[+] Scanning styles.css stylesheet rules... OK", type: "info" },
            { text: "[+] Verifying layout assets and components... OK", type: "info" },
            { text: "[+] Loading Muhammed Farhan A S profile competencies... OK", type: "success" },
            { text: "[+] Checking educational credentials (MG University - MSc & BSc)... VERIFIED", type: "success" },
            { text: "[+] Auditing professional certifications (OCSP, Deloitte, Tata, Kaspersky)... VERIFIED", type: "success" },
            { text: "[+] Verifying professional references (Offenso Hackers Academy & KMM College)... VERIFIED", type: "success" },
            { text: "[SUCCESS] Scan completed. Node integrity: 100%. Status: SECURE.", type: "success" }
        ];
        
        runSim(simLines, 450);
    });
});
