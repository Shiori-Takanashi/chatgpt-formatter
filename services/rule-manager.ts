import { FormatterRule } from "../formatter.types";
import * as rules from "../rules";
import { ruleMetadata } from "./rule-metadata";

class RuleManager {
    private rules: Map<string, FormatterRule> = new Map();

    constructor() {
        this.loadAllRules();
    }

    private loadAllRules(): void {
        const allRules = Object.values(rules) as FormatterRule[];
        allRules.forEach(rule => {
            // メタデータに基づいて name, description, order を設定
            const meta = ruleMetadata[rule.id];
            if (meta) {
                rule.name = meta.name;
                rule.description = meta.description;
                rule.order = meta.order;
            }
            this.rules.set(rule.id, rule);
        });
    }

    // 有効なルールを順序通りに取得
    public getEnabledRules(): FormatterRule[] {
        return Array.from(this.rules.values())
            .filter(rule => rule.enabled)
            .sort((a, b) => (a.order || 0) - (b.order || 0));
    }

    // ルールをIDで取得
    public getRule(id: string): FormatterRule | undefined {
        return this.rules.get(id);
    }

    // ルールの有効/無効を切り替え
    public toggleRule(id: string, enabled?: boolean): boolean {
        const rule = this.rules.get(id);
        if (!rule) return false;

        rule.enabled = enabled !== undefined ? enabled : !rule.enabled;
        return true;
    }

    // カテゴリ別のルール取得
    public getRulesByCategory(category: string): FormatterRule[] {
        return Array.from(this.rules.values())
            .filter(rule => rule.category === category)
            .sort((a, b) => (a.order || 0) - (b.order || 0));
    }

    // 全ルールの取得
    public getAllRules(): FormatterRule[] {
        return Array.from(this.rules.values())
            .sort((a, b) => (a.order || 0) - (b.order || 0));
    }

    // ルールの順序変更
    public reorderRule(id: string, newOrder: number): boolean {
        const rule = this.rules.get(id);
        if (!rule) return false;

        rule.order = newOrder;
        return true;
    }
}

// シングルトンインスタンス
export const ruleManager = new RuleManager();
