import { IExecuteFunctions, ILoadOptionsFunctions } from 'n8n-workflow';

const BASE_URL = 'https://api-test03.browseract.com/v2';

const COMMON_HEADERS = { 'api-channel-ak': 'n8nak' };

export const BROWSER_ACT_API = 'browserActApi';

// export const noCredentialOption = {
// 	displayName: 'Please Set BrowserAct Credentials First',
// 	name: 'Please Set BrowserAct Credentials First',
// 	value: '__no_credentials__',
// };

// 服务器最大超时时间是24小时，60 / 5 * 60 * 24 = 17280，最大能查询 17280 次，考虑到时间差，这边只请求到第 16560 次 (23小时)，进行取消任务
export const QUERY_LIMIT = 16560;
export const QUERY_DELAY = 5000;

export async function browserActRequest(
	context: ILoadOptionsFunctions | IExecuteFunctions,
	{
		method,
		endpoint,
		body,
		qs,
	}: {
		method: 'GET' | 'POST' | 'PUT' | 'DELETE';
		endpoint: string;
		body?: any;
		qs?: any;
	},
) {
	return context.helpers.httpRequestWithAuthentication.call(context, 'browserActApi', {
		method,
		url: endpoint,
		baseURL: BASE_URL,
		headers: { ...COMMON_HEADERS },
		body,
		qs,
		json: true,
	});
}

export function log(...value: any[]) {
	// @ts-ignore
	console.log(value);
}
