# Linkwarden Browser Extension

Fork of the official extension for [Linkwarden](https://github.com/linkwarden/linkwarden), a self-hosted, open-source collaborative bookmark
manager to
collect, organize and archive webpages.

**Features**

- Add and organize new links to Linkwarden with a single click.
- Automatically fill the description using the retrieved page metadata.

![Image](/assets/linkwarden-extension.png)

## Installation

Chrome, Brave and other Chromium based browsers: [Chrome Web Store](https://chrome.google.com/webstore/detail/linkwarden/pnidmkljnhbjfffciajlcpeldoljnidn)

Firefox: [Mozilla Addon Store](https://addons.mozilla.org/en-US/firefox/addon/linkwarden)

## Build From Source

### Requirements

- LTS NodeJS 18.x.x
- NPM Version 9.x.x
- Bash
- Git

### Step 1: Clone this repo

Clone this repository by running the following in your terminal:

```
git clone https://github.com/jojoto/Linkwarden-browser-extension.git
```

### Step 2: Build

Head to the generated folder:

```
cd browser-extension
```

And run:

```
chmod +x ./build.sh && ./build.sh
```

After the above command, use the `/dist` folder as an unpacked extension in your browser.
