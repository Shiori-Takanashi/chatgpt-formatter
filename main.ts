import { Plugin, PluginSettingTab, Setting, App } from "obsidian";
import { format } from "./formatter";
import { ruleManager } from "./services/rule-manager";
import { configManager } from "./services/config-manager";
import { RuleCategory } from "./rules/categories";

// 設定タブの定義
class ChatGPTFormatterSettingTab extends PluginSettingTab {
    plugin: ChatGPTFormatterPlugin;

    constructor(app: App, plugin: ChatGPTFormatterPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();

        // カテゴリ別にルールを表示
        const categories = Object.values(RuleCategory);
        categories.forEach(category => {
            containerEl.createEl('h2', { text: `${category}` });

            const rules = ruleManager.getRulesByCategory(category);
            rules.forEach(rule => {
                const setting = new Setting(containerEl)
                    .setName(rule.name)
                    .setDesc(rule.description || '')
                    .addToggle(toggle => toggle
                        .setValue(rule.enabled)
                        .onChange(async (value) => {
                            await configManager.updateRuleConfig(rule.id, { enabled: value });
                        }));

                // ルールに特有の設定があれば追加
                if (rule.options) {
                    Object.entries(rule.options).forEach(([key, value]) => {
                        if (typeof value === 'boolean') {
                            setting.addToggle(toggle => toggle
                                .setValue(value)
                                .onChange(async (newValue) => {
                                    await configManager.updateRuleConfig(rule.id, {
                                        options: { [key]: newValue }
                                    });
                                }));
                        } else if (typeof value === 'string') {
                            setting.addText(text => text
                                .setValue(value)
                                .onChange(async (newValue) => {
                                    await configManager.updateRuleConfig(rule.id, {
                                        options: { [key]: newValue }
                                    });
                                }));
                        }
                    });
                }
            });
        });
    }
}

export default class ChatGPTFormatterPlugin extends Plugin {
    async onload() {
        console.log("ChatGPT Formatter loaded");

        // ConfigManagerにプラグインインスタンスを設定
        await configManager.setPlugin(this);
        console.log("configManager.setPlugin(this) finished.");

        // 全テキストのフォーマットを1コマンドで実行 (Alt+C用)
        this.addCommand({
            id: "format-all-text",
            name: "全テキストをフォーマット",
            hotkeys: [{ modifiers: ["Alt"], key: "c" }],
            editorCallback: (editor) => {
                try {
                    console.log("format-all-text command: Attempting to move cursor to start.");
                    editor.setCursor(0, 0);
                    console.log("format-all-text command: Cursor moved to start. Current pos:", editor.getCursor());

                    const entireText = editor.getValue();
                    console.log("format-all-text command: Got text, length:", entireText.length);

                    const formatted = format(entireText);
                    console.log("format-all-text command: Text formatted, new length:", formatted.length);

                    editor.setValue(formatted);
                    console.log("format-all-text command: setValue completed.");

                    editor.setCursor(0, 0);
                    console.log("format-all-text command: Cursor set to start again. Final pos:", editor.getCursor());
                } catch (e) {
                    console.error("Error in format-all-text command:", e);
                    // 必要に応じてユーザーに通知
                    // new Notice("Error during formatting. Check console.");
                }
            }
        });
        console.log("format-all-text command registered.");



        // 設定タブの追加
        this.addSettingTab(new ChatGPTFormatterSettingTab(this.app, this));
    }

    async onunload() {
        // 設定の保存
        await configManager.saveConfig();
    }
}
