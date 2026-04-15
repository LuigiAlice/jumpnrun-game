import Phaser from 'phaser';
import { getLevelCount } from '../data/levels/index';
import { GAME_WIDTH, GAME_HEIGHT } from '../config';

interface BiomeButton {
    button: Phaser.GameObjects.Container;
    biomeIndex: number;
    biomeName: string;
}

interface LevelButton {
    button: Phaser.GameObjects.Container;
    levelIndex: number;
    biomeIndex: number;
    levelInBiome: number;
}

export class TitleScene extends Phaser.Scene {
    private audioContext?: AudioContext;
    private isMusicPlaying: boolean = false;
    private titleMusicInterval?: any;
    
    private biomeButtons: BiomeButton[] = [];
    private levelButtons: LevelButton[] = [];
    private selectedBiome: number = 0;
    private selectedLevel: number = 0;
    private startButton!: Phaser.GameObjects.Container;
    private levelLabel!: Phaser.GameObjects.Text;
    private levelGrid!: Phaser.GameObjects.Container;
    private backgroundImage!: Phaser.GameObjects.Image;
    
    private readonly BIOME_NAMES = [
        'grasslands', 'desert', 'water', 'ice-snow', 'sky-clouds',
        'forest', 'village', 'beach-island', 'factory', 'volcano-lava',
        'haunted-mansion', 'ruins', 'canyon-base', 'space-star', 'castle-final'
    ];
    
    private readonly BIOME_COLORS = [
        '#2ecc71', '#f39c12', '#3498db', '#ecf0f1', '#87ceeb',
        '#27ae60', '#8b4513', '#f1c40f', '#7f8c8d', '#e74c3c',
        '#9b59b6', '#d35400', '#c0392b', '#1a1a2e', '#34495e'
    ];

    constructor() {
        super({ key: 'Title' });
    }

    create() {
        const centerX = GAME_WIDTH / 2;

        this.backgroundImage = this.add.image(centerX, GAME_HEIGHT / 2, 'bg_grasslands_0');

        this.add.text(centerX, 60, 'SUPER JUMP WORLD', {
            fontSize: '48px',
            fontFamily: 'Arial Black',
            color: '#f1c40f',
            stroke: '#e74c3c',
            strokeThickness: 8
        }).setOrigin(0.5);

        // Biome tabs
        this.createBiomeTabs();

        // Level grid
        this.createLevelGrid();

        // Start button
        this.createStartButton();

        // Control help
        this.add.text(centerX, GAME_HEIGHT - 180, '← → : Bewegen  |  ↑ : Springen  |  X : Feuerbälle', {
            fontSize: '16px',
            color: '#fff',
            stroke: '#000',
            strokeThickness: 3
        }).setOrigin(0.5);
        
        // Select first level by default
        this.selectBiome(0);
        this.selectLevel(0);
    }
    
    private createBiomeTabs() {
        const cols = 5;
        const tabWidth = 200;
        const tabHeight = 30;
        const gapX = 20;
        const gapY = 10;
        const startX = GAME_WIDTH / 2 - (cols * (tabWidth + gapX) - gapX) / 2;
        const startY = 120;
        
        this.BIOME_NAMES.forEach((biome, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const x = startX + col * (tabWidth + gapX);
            const y = startY + row * (tabHeight + gapY);
            
            const tab = this.add.container(x, y);
            
            const bg = this.add.graphics();
            bg.fillStyle(0x000000, 0.7);
            bg.fillRoundedRect(-tabWidth/2, -tabHeight/2, tabWidth, tabHeight, 6);
            bg.lineStyle(2, Phaser.Display.Color.HexStringToColor(this.BIOME_COLORS[i]).color, 1);
            bg.strokeRoundedRect(-tabWidth/2, -tabHeight/2, tabWidth, tabHeight, 6);
            
            const text = this.add.text(0, 0, biome, {
                fontSize: '11px',
                fontFamily: 'Arial',
                color: '#fff'
            }).setOrigin(0.5);
            
            tab.add([bg, text]);
            tab.setSize(tabWidth, tabHeight);
            tab.setInteractive({ useHandCursor: true });
            
            tab.on('pointerover', () => {
                bg.clear();
                bg.fillStyle(Phaser.Display.Color.HexStringToColor(this.BIOME_COLORS[i]).color, 0.5);
                bg.fillRoundedRect(-tabWidth/2, -tabHeight/2, tabWidth, tabHeight, 6);
                bg.lineStyle(2, Phaser.Display.Color.HexStringToColor(this.BIOME_COLORS[i]).color, 1);
                bg.strokeRoundedRect(-tabWidth/2, -tabHeight/2, tabWidth, tabHeight, 6);
            });
            
            tab.on('pointerout', () => {
                if (this.selectedBiome === i) return;
                bg.clear();
                bg.fillStyle(0x000000, 0.7);
                bg.fillRoundedRect(-tabWidth/2, -tabHeight/2, tabWidth, tabHeight, 6);
                bg.lineStyle(2, Phaser.Display.Color.HexStringToColor(this.BIOME_COLORS[i]).color, 1);
                bg.strokeRoundedRect(-tabWidth/2, -tabHeight/2, tabWidth, tabHeight, 6);
            });
            
            tab.on('pointerdown', () => {
                this.selectBiome(i);
                this.startMusic();
            });
            
            this.biomeButtons.push({ button: tab, biomeIndex: i, biomeName: biome });
        });
    }
    
    private createLevelGrid() {
        this.levelGrid = this.add.container(GAME_WIDTH / 2, 380);
        
        const cols = 3;
        const rows = 2;
        const btnWidth = 180;
        const btnHeight = 80;
        const gapX = 30;
        const gapY = 25;
        
        for (let biome = 0; biome < 15; biome++) {
            for (let level = 0; level < 6; level++) {
                const col = level % cols;
                const row = Math.floor(level / cols);
                const x = (col - 1) * (btnWidth + gapX);
                const y = (row - 0.5) * (btnHeight + gapY);
                
                const levelIndex = biome * 6 + level;
                const biomeNo = biome + 1;
                const levelNo = level + 1;
                const label = `${this.BIOME_NAMES[biome]}-${biomeNo}.${levelNo}`;
                
                const container = this.add.container(x, y);
                container.setVisible(false);
                
                const bg = this.add.graphics();
                this.drawLevelButton(bg, btnWidth, btnHeight, false, biome);
                
                const text = this.add.text(0, -10, label, {
                    fontSize: '16px',
                    fontFamily: 'Arial Black',
                    color: '#fff'
                }).setOrigin(0.5);
                
                const numText = this.add.text(0, 18, `${levelIndex + 1}`, {
                    fontSize: '24px',
                    fontFamily: 'Arial',
                    color: '#aaa'
                }).setOrigin(0.5);
                
                container.add([bg, text, numText]);
                container.setSize(btnWidth, btnHeight);
                container.setInteractive({ useHandCursor: true });
                
                container.on('pointerover', () => {
                    if (this.selectedBiome === biome && this.selectedLevel === level) return;
                    this.drawLevelButton(bg, btnWidth, btnHeight, true, biome);
                });
                
                container.on('pointerout', () => {
                    if (this.selectedBiome === biome && this.selectedLevel === level) return;
                    this.drawLevelButton(bg, btnWidth, btnHeight, false, biome);
                });
                
                container.on('pointerdown', () => {
                    this.selectBiome(biome);
                    this.selectLevel(level);
                    this.startMusic();
                });
                
                this.levelGrid.add(container);
                this.levelButtons.push({
                    button: container,
                    levelIndex,
                    biomeIndex: biome,
                    levelInBiome: level
                });
            }
        }
    }
    
    private drawLevelButton(bg: Phaser.GameObjects.Graphics, w: number, h: number, hover: boolean, biome: number) {
        const color = Phaser.Display.Color.HexStringToColor(this.BIOME_COLORS[biome]).color;
        
        bg.clear();
        bg.fillStyle(0x000000, hover ? 0.9 : 0.7);
        bg.fillRoundedRect(-w/2, -h/2, w, h, 12);
        bg.lineStyle(3, color, hover ? 1 : 0.7);
        bg.strokeRoundedRect(-w/2, -h/2, w, h, 12);
        
        if (hover) {
            bg.fillStyle(color, 0.3);
            bg.fillRoundedRect(-w/2, -h/2, w, h, 12);
        }
    }
    
    private createStartButton() {
        this.startButton = this.add.container(GAME_WIDTH / 2, 530);
        
        const bg = this.add.graphics();
        bg.fillStyle(0x2ecc71, 1);
        bg.fillRoundedRect(-140, -30, 280, 60, 15);
        bg.lineStyle(4, 0x27ae60, 1);
        bg.strokeRoundedRect(-140, -30, 280, 60, 15);
        
        this.levelLabel = this.add.text(0, -5, 'grasslands-1.1', {
            fontSize: '24px',
            fontFamily: 'Arial Black',
            color: '#fff'
        }).setOrigin(0.5);
        
        const hint = this.add.text(0, 18, 'KLICKEN ZUM START', {
            fontSize: '12px',
            fontFamily: 'Arial',
            color: '#afa'
        }).setOrigin(0.5);
        
        this.startButton.add([bg, this.levelLabel, hint]);
        this.startButton.setSize(280, 60);
        this.startButton.setInteractive({ useHandCursor: true });
        
        this.startButton.on('pointerover', () => {
            const bg = this.startButton.getAt(0) as Phaser.GameObjects.Graphics;
            bg.clear();
            bg.fillStyle(0x27ae60, 1);
            bg.fillRoundedRect(-140, -30, 280, 60, 15);
            bg.lineStyle(4, 0x2ecc71, 1);
            bg.strokeRoundedRect(-140, -30, 280, 60, 15);
        });
        
        this.startButton.on('pointerout', () => {
            const bg = this.startButton.getAt(0) as Phaser.GameObjects.Graphics;
            bg.clear();
            bg.fillStyle(0x2ecc71, 1);
            bg.fillRoundedRect(-140, -30, 280, 60, 15);
            bg.lineStyle(4, 0x27ae60, 1);
            bg.strokeRoundedRect(-140, -30, 280, 60, 15);
        });
        
        this.startButton.on('pointerdown', () => {
            this.stopMusic();
            this.scene.start('Game', {
                levelIndex: this.selectedBiome * 6 + this.selectedLevel,
                lives: 3,
                score: 0
            });
        });
    }
    
    private selectBiome(biome: number) {
        // Update biome tabs
        this.biomeButtons.forEach((b, i) => {
            const bg = b.button.getAt(0) as Phaser.GameObjects.Graphics;
            bg.clear();
            bg.fillStyle(0x000000, i === biome ? 0.9 : 0.7);
            bg.fillRoundedRect(-50, -15, 100, 30, 6);
            bg.lineStyle(2, Phaser.Display.Color.HexStringToColor(this.BIOME_COLORS[i]).color, i === biome ? 1 : 0.5);
            bg.strokeRoundedRect(-50, -15, 100, 30, 6);
        });
        
        // Show/hide level buttons for this biome
        this.levelButtons.forEach((lb) => {
            const visible = lb.biomeIndex === biome;
            lb.button.setVisible(visible);
        });

        // Update background to match biome
        const biomeBgName = 'bg_' + this.BIOME_NAMES[biome] + '_0';
        this.backgroundImage.setTexture(biomeBgName);
        
        // Try to keep selected level if same biome, otherwise select first
        if (this.selectedBiome !== biome) {
            this.selectedLevel = 0;
        }
        this.selectedBiome = biome;
        
        // Redraw visible level buttons to show selection
        this.updateLevelSelection();
    }
    
    private selectLevel(level: number) {
        this.selectedLevel = level;
        this.updateLevelSelection();
        
        // Update start button label
        const biomeNo = this.selectedBiome + 1;
        const levelNo = this.selectedLevel + 1;
        const label = `${this.BIOME_NAMES[this.selectedBiome]}-${biomeNo}.${levelNo}`;
        this.levelLabel.setText(label);
    }
    
    private updateLevelSelection() {
        this.levelButtons.forEach((lb) => {
            if (lb.biomeIndex !== this.selectedBiome) return;
            
            const isSelected = lb.levelInBiome === this.selectedLevel;
            const bg = lb.button.getAt(0) as Phaser.GameObjects.Graphics;
            const btnWidth = 180;
            const btnHeight = 80;
            
            bg.clear();
            if (isSelected) {
                const color = Phaser.Display.Color.HexStringToColor(this.BIOME_COLORS[this.selectedBiome]).color;
                bg.fillStyle(color, 0.4);
                bg.fillRoundedRect(-btnWidth/2, -btnHeight/2, btnWidth, btnHeight, 12);
                bg.lineStyle(4, color, 1);
                bg.strokeRoundedRect(-btnWidth/2, -btnHeight/2, btnWidth, btnHeight, 12);
            } else {
                this.drawLevelButton(bg, btnWidth, btnHeight, false, this.selectedBiome);
            }
        });
    }
    
    private startMusic() {
        if (this.isMusicPlaying) return;
        this.isMusicPlaying = true;
        
        try {
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            
            const notes = [
                392, 0, 392, 0, 523, 0, 392, 0, 440, 0, 440, 0,
                392, 0, 392, 0, 523, 0, 392, 0, 440, 0, 440, 0,
                349, 0, 349, 0, 392, 0, 349, 0, 330, 0, 330, 0,
                294, 0, 294, 0, 330, 0, 294, 0, 262, 0, 262, 0
            ];
            
            const bass = [
                196, 0, 196, 0, 196, 0, 196, 0, 220, 0, 220, 0,
                196, 0, 196, 0, 196, 0, 196, 0, 220, 0, 220, 0,
                175, 0, 175, 0, 175, 0, 175, 0, 196, 0, 196, 0,
                147, 0, 147, 0, 147, 0, 147, 0, 165, 0, 165, 0
            ];
            
            let step = 0;
            this.titleMusicInterval = setInterval(() => {
                if (!this.audioContext || !this.isMusicPlaying) return;
                
                if (notes[step] > 0) {
                    this.playNote(notes[step], 'triangle', 0.06, 0.12);
                }
                if (bass[step] > 0) {
                    this.playNote(bass[step], 'square', 0.03, 0.2);
                }
                
                step = (step + 1) % notes.length;
            }, 180);
            
        } catch (e) {
            console.log('Audio not available:', e);
        }
    }
    
    private playNote(freq: number, type: OscillatorType, volume: number, duration: number) {
        if (!this.audioContext) return;
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);
        gain.gain.setValueAtTime(volume, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        osc.start();
        osc.stop(this.audioContext.currentTime + duration);
    }

    private stopMusic() {
        this.isMusicPlaying = false;
        if (this.titleMusicInterval) {
            clearInterval(this.titleMusicInterval);
        }
    }

    shutdown() {
        this.stopMusic();
        (this as any).scene?.stop();
    }
}