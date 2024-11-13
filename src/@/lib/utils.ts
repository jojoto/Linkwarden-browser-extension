import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {DOMParser} from 'linkedom';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface TabInfo {
  url: string;
  title: string;
}

export async function getCurrentTabInfo(): Promise<{
  url: string | undefined;
  title: string | undefined;
  description?: string | undefined;
  tags?: string[];
}> {
  const tabs = await getBrowser().tabs.query({ active: true, currentWindow: true });
  if (tabs.length === 0) return { url: undefined, title: undefined, description: undefined, tags: undefined };

  const { url, title, id } = tabs[0];
  let description: string | undefined = undefined;
  let tags: string[] | undefined = undefined;

  if (id !== undefined) {
    try {
      const response = await getBrowser().tabs.executeScript(id, {
        code: 'document.documentElement.outerHTML'
      });
      const html = response[0] as string;

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const metaTags = doc.querySelectorAll('meta[name="description"], meta[property="og:description"], meta[name="twitter:description"]');
      metaTags.forEach((tag: { getAttribute: (arg0: string) => any; }) => {
        const content = tag.getAttribute('content');
        if (content) {
          description = content;
        }
      });

      const keywordsTags = doc.querySelectorAll('meta[name="keywords"]');
      if (keywordsTags.length > 0) {
        const content = keywordsTags[0].getAttribute('content');
        tags = content ? content.split(',') : undefined;
      }
    } catch (error) {
      console.error(`Error retrieving tab content: ${error}`);
    }
  }

  return { url, title, description, tags };
}



export function getBrowser() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return typeof browser !== 'undefined' ? browser : chrome;
}

export function getChromeStorage() {
  return typeof chrome !== 'undefined' && !!chrome.storage;
}

export async function getStorageItem(key: string) {
  if (getChromeStorage()) {
    const result = await getBrowser().storage.local.get([key]);
    return result[key];
  } else {
    return getBrowser().storage.local.get(key);
  }
}


export async function setStorageItem(key: string, value: string) {
  if (getChromeStorage()) {
    return await chrome.storage.local.set({ [key]: value });
  } else {
    await getBrowser().storage.local.set({ [key]: value });
    return Promise.resolve();
  }
}

export function openOptions() {
  getBrowser().runtime.openOptionsPage();
}
