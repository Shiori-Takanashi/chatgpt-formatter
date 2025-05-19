import { FormatterRule } from "./formatter.types";
import { ruleManager } from "./services/rule-manager";

export function format(text: string, options?: {
	customRules?: FormatterRule[],
	skipRuleIds?: string[]
}): string {
	// ルールの取得
	let rulesToApply = options?.customRules || ruleManager.getEnabledRules();

	// 特定のルールをスキップする場合
	if (options?.skipRuleIds?.length) {
		rulesToApply = rulesToApply.filter(rule => !options.skipRuleIds?.includes(rule.id));
	}

	// ルールの適用
	let result = text;
	for (const rule of rulesToApply) {
		try {
			result = rule.apply(result);
		} catch (error) {
			console.error(`Error applying rule ${rule.id}: ${error.message}`);
		}
	}

	return result;
}
