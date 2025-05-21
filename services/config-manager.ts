import { ruleManager } from './rule-manager';
import { Plugin } from 'obsidian';

interface RuleConfig {
    enabled: boolean;
    order: number;
    options?: Record<string, any>;
}

interface Config {
    rules: Record<string, RuleConfig>;
}

export class ConfigManager {
    private config: Config = { rules: {} };
    private plugin: Plugin | null = null;

    constructor() {
        // プラグインインスタンスは後から設定します
    }

    // プラグインインスタンスの設定
    public async setPlugin(plugin: Plugin): Promise<void> {
        this.plugin = plugin;
        await this.loadConfig();
    }

    // 設定ファイルを読み込む
    private async loadConfig(): Promise<void> {
        try {
            // loadData()はPromiseを返すため、awaitで処理する
            const loadedData = await this.plugin?.loadData();
            if (loadedData) {
                this.config = loadedData as Config;
                this.applyConfig();
            } else {
                this.saveDefaultConfig();
            }
        } catch (error) {
            console.error(`Failed to load config: ${error.message}`);
            this.saveDefaultConfig();
        }
    }

    // 設定を適用する
    private applyConfig(): void {
        const { rules } = this.config;
        Object.entries(rules).forEach(([id, config]) => {
            const rule = ruleManager.getRule(id);
            if (rule) {
                rule.enabled = config.enabled;
                rule.order = config.order;
                if (config.options) {
                    rule.options = { ...config.options };
                }
            }
        });
    }

    // 現在の設定を保存する
    public async saveConfig(): Promise<void> {
        try {
            const rules = ruleManager.getAllRules().reduce((acc, rule) => {
                acc[rule.id] = {
                    enabled: rule.enabled,
                    order: rule.order,
                    options: rule.options
                };
                return acc;
            }, {} as Record<string, RuleConfig>);

            const config: Config = { rules };
            await this.plugin?.saveData(config);
        } catch (error) {
            console.error(`Failed to save config: ${error.message}`);
        }
    }

    // デフォルト設定を保存する
    private async saveDefaultConfig(): Promise<void> {
        const rules = ruleManager.getAllRules().reduce((acc, rule) => {
            acc[rule.id] = {
                enabled: rule.enabled,
                order: rule.order,
                options: rule.options
            };
            return acc;
        }, {} as Record<string, RuleConfig>);

        this.config = { rules };
        await this.saveConfig();
    }

    // ルール設定の更新
    public async updateRuleConfig(id: string, config: Partial<RuleConfig>): Promise<boolean> {
        const rule = ruleManager.getRule(id);
        if (!rule) return false;

        if (config.enabled !== undefined) rule.enabled = config.enabled;
        if (config.order !== undefined) rule.order = config.order;
        if (config.options) rule.options = { ...rule.options, ...config.options };

        await this.saveConfig();
        return true;
    }
}

// シングルトンインスタンス
export const configManager = new ConfigManager();
