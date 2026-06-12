function workspaceApp() {
  return {
    activeFilter: "all",
    activeMission: "teach",
    clock: "",
    copied: false,
    commandOpen: false,
    mobileOpen: false,
    mode: "research",
    pointer: { x: 600, y: 240 },
    progress: 74,
    query: "",
    scrollProgress: 0,
    showTop: false,
    stats: {
      papers: 42,
      modules: 13,
      tools: 8
    },
    theme: "dark",
    filters: [
      { id: "all", label: "All" },
      { id: "research", label: "Research" },
      { id: "teaching", label: "Teaching" },
      { id: "ai", label: "AI" }
    ],
    systems: [
      {
        title: "Paper Intelligence",
        type: "Research",
        group: "research",
        icon: "file-search",
        accent: "teal",
        status: "Reading Stack",
        copy: "把論文摘要、方法、量表細節與研究限制整理成可追蹤的知識庫。"
      },
      {
        title: "Assessment Lab",
        type: "Research",
        group: "research",
        icon: "chart-no-axes-combined",
        accent: "yellow",
        status: "Model Ready",
        copy: "集中管理信度、效度、IRT、CAT 與教育測驗設計的範例。"
      },
      {
        title: "Course Reactor",
        type: "Teaching",
        group: "teaching",
        icon: "panel-top-open",
        accent: "coral",
        status: "Class Mode",
        copy: "把課程單元、活動、講義與示範資料變成清楚的學習路線。"
      },
      {
        title: "AI Build Room",
        type: "AI",
        group: "ai",
        icon: "cpu",
        accent: "violet",
        status: "Prototype",
        copy: "發展 AI 輔助讀文獻、製作教材、整理回饋與建立網站的流程。"
      }
    ],
    missionTabs: [
      {
        id: "teach",
        label: "Teach",
        title: "Course-ready workspace",
        copy: "把課程內容整理成可瀏覽、可連結、可更新的公開入口，學生可以快速找到單元、教材與延伸資源。",
        points: ["Unit map", "Slides", "Activities"]
      },
      {
        id: "research",
        label: "Research",
        title: "Source-grounded research hub",
        copy: "把文獻、方法、統計結果與研究想法放在同一個地方，讓每次閱讀都能累積成下一次研究的素材。",
        points: ["Paper notes", "Methods", "Evidence"]
      },
      {
        id: "build",
        label: "Build",
        title: "Prototype launchpad",
        copy: "用 HTML 與成熟前端工具快速做出 demo，再把有價值的互動整理成可分享的教學或研究工具。",
        points: ["Demos", "Workflows", "GitHub"]
      }
    ],
    commands: [
      { label: "Open Lab", icon: "flask-conical", target: "#lab" },
      { label: "Open Systems", icon: "layers-3", target: "#systems" },
      { label: "Open Missions", icon: "radar", target: "#missions" },
      { label: "Open GitHub", icon: "github", url: "https://github.com/Susanskchen-NYCU/work-space-for-SCHEN" },
      { label: "Toggle Theme", icon: "moon", action: "theme" }
    ],
    get currentMission() {
      return this.missionTabs.find((tab) => tab.id === this.activeMission) || this.missionTabs[0];
    },
    get filteredCommands() {
      const term = this.query.trim().toLowerCase();
      if (!term) return this.commands;
      return this.commands.filter((command) => command.label.toLowerCase().includes(term));
    },
    get filteredSystems() {
      if (this.activeFilter === "all") return this.systems;
      return this.systems.filter((item) => item.group === this.activeFilter);
    },
    get modeCopy() {
      const copy = {
        research: "Evidence-first reading, psychometrics, and analysis notes are queued for synthesis.",
        teaching: "Course materials, unit flows, and classroom-ready resources are in production.",
        ai: "AI workflows and lightweight prototypes are ready for rapid experiments."
      };
      return copy[this.mode];
    },
    get modeLabel() {
      const labels = {
        research: "Research Mode",
        teaching: "Teaching Mode",
        ai: "AI Studio"
      };
      return labels[this.mode];
    },
    init() {
      this.theme = localStorage.getItem("schen-theme") || "dark";
      this.updateClock();
      setInterval(() => this.updateClock(), 1000);

      window.addEventListener("mousemove", (event) => {
        this.pointer = { x: event.clientX, y: event.clientY };
      });

      window.addEventListener("scroll", () => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        this.scrollProgress = scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0;
        this.showTop = window.scrollY > 620;
      });

      window.addEventListener("keydown", (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
          event.preventDefault();
          this.commandOpen = true;
        }
      });

      this.$nextTick(() => {
        setupMotion();
        refreshIcons();
      });
    },
    copyRepo() {
      const repoUrl = "https://github.com/Susanskchen-NYCU/work-space-for-SCHEN";
      const done = () => {
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 1600);
      };

      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(repoUrl).then(done).catch(done);
      } else {
        done();
      }
    },
    resetTilt(event) {
      event.currentTarget.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    },
    runCommand(command) {
      if (command.action === "theme") {
        this.toggleTheme();
      }
      if (command.target) {
        document.querySelector(command.target)?.scrollIntoView({ behavior: "smooth" });
      }
      if (command.url) {
        window.open(command.url, "_blank", "noreferrer");
      }
      this.commandOpen = false;
      this.query = "";
    },
    runFirstCommand() {
      const first = this.filteredCommands[0];
      if (first) this.runCommand(first);
    },
    scrollTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    setMode(nextMode) {
      this.mode = nextMode;
      const values = { research: 74, teaching: 62, ai: 88 };
      this.progress = values[nextMode];
    },
    tiltCard(event) {
      const card = event.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 8;
      const rotateX = ((y / rect.height) - 0.5) * -8;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    },
    toggleTheme() {
      this.theme = this.theme === "dark" ? "light" : "dark";
      localStorage.setItem("schen-theme", this.theme);
      setTimeout(refreshIcons, 0);
    },
    updateClock() {
      this.clock = new Intl.DateTimeFormat("zh-TW", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Taipei"
      }).format(new Date());
    }
  };
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function setupMotion() {
  refreshIcons();

  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".hero-copy .reveal", {
    y: 34,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.1
  });

  gsap.utils.toArray(".reveal").forEach((element) => {
    if (element.closest(".hero-copy")) return;
    gsap.from(element, {
      y: 38,
      opacity: 0,
      duration: 0.75,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 84%"
      }
    });
  });
}
