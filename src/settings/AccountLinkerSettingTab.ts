import { App, PluginSettingTab, Setting} from 'obsidian';
import AccountLinker from 'main';
import drawAccountLink from 'src/control/drawAccountLink';
import WebsiteEditModal from './WebsiteEditModal';
import { websiteConfig } from 'src/control/websiteConfig';

export default class AccountLinkerSettingTab extends PluginSettingTab {
    plugin: AccountLinker;

    constructor(app: App, plugin: AccountLinker) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();
        const siteDiv = containerEl.createDiv()
        this.drawSites(siteDiv)

    }
    drawSites(div:HTMLElement) {
        div.empty()
        const websites = this.plugin.settings.websites
        websites.forEach((website,i)=>{
            const s = new Setting(div)
                .setDesc(website.name)
                .addButton(button => {
                    button.onClick(() => {
                        const modal = new WebsiteEditModal(this.plugin,website,(config:websiteConfig)=>{
                            this.plugin.settings.websites[i] = config
                            this.plugin.saveSettings()
                            this.drawSites(div)
                        })
                        modal.open()
                    });
                    button.setIcon("pencil");
                    button.setTooltip("Edit")
                })
                .addButton(button => {
					button.onClick(() => {
                        this.plugin.settings.websites.remove(website)
                        this.plugin.saveSettings()
                        this.drawSites(div)
					});
					button.setIcon("cross");
					button.setTooltip("Remove");
				});
            const linker = document.createElement("a")
            drawAccountLink(linker,website,"example")
            s.descEl.innerHTML += linker.outerHTML
        })
        new Setting(div)
            .addButton(button=>{
                button.onClick(()=>{
                    const modal = new WebsiteEditModal(this.plugin, new websiteConfig, (config: websiteConfig) => {
                        this.plugin.settings.websites.push(config)
                        this.plugin.saveSettings()
                        this.drawSites(div)
                    })
                    modal.open()
                })
                button.setIcon("plus-with-circle")
                button.setTooltip("New")
            })
    }
}
