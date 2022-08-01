import {Plugin} from 'obsidian';
import AccountLinkerSettingTab from './src/settings/AccountLinkerSettingTab'
import { AccountLinkerSettings,DEFAULT_SETTINGS } from 'src/settings/AccountLinkerSettings';
import {frontmatterProcessor} from 'src/drawing/frontmatterProcessor';



export default class AccountLinker extends Plugin {
	settings: AccountLinkerSettings;

	async onload() {
		await this.loadSettings();
		this.registerMarkdownPostProcessor(frontmatterProcessor(this))
		this.addSettingTab(new AccountLinkerSettingTab(this.app,this));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}