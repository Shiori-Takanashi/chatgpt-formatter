import { FormatterRule } from "../formatter.types";
import * as rules from "../rules";

class RuleManager {
    private rules: Map<string, FormatterRule> = new Map();

    constructor() {
        this.loadAllRules();
    }

    private loadAllRules(): void {
        const allRules = Object.values(rules) as FormatterRule[];
        allRules.forEach(rule => {
            this.rules.set(rule.id, rule);
        });
    }

    // 有効なルールを順序通りに取得
    public getEnabledRules(): FormatterRule[] {
        return Array.from(this.rules.values())
            .filter(rule => rule.enabled)
            .sort((a, b) => a.order - b.order);
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
            .sort((a, b) => a.order - b.order);
    }

    // 全ルールの取得
    public getAllRules(): FormatterRule[] {
        return Array.from(this.rules.values())
            .sort((a, b) => a.order - b.order);
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
