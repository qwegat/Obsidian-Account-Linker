import { App, PluginSettingTab} from 'obsidian';
import AccountLinker from 'main';

export default class AccountLinkerSettingTab extends PluginSettingTab {
    plugin: AccountLinker;

    constructor(app: App, plugin: AccountLinker) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();
    }
    drawSites(div:HTMLElement) {
        
    }
}
