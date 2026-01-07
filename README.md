# GitHub Clone URL Prepender

A Firefox extension that automatically prepends `git clone ` to GitHub repository URLs when you copy them from the clone dropdown.

## Features

- Automatically adds `git clone ` prefix when copying repository URLs from GitHub
- Supports both HTTPS and SSH clone URLs
- Works seamlessly with GitHub's native clone dropdown
- Visual feedback when URL is copied
- No special permissions required
- Lightweight and fast

## Installation

### From Source (Development)

1. Clone or download this repository
2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on..."
4. Navigate to the extension directory and select `manifest.json`
5. The extension is now installed and active

### Permanent Installation

1. Navigate to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on..."
3. Select the `manifest.json` file

Note: For permanent installation, you can either:
- Package the extension and install it manually (see "Packaging" section below)
- Submit it to the Firefox Add-ons store

## Usage

1. Navigate to any GitHub repository (e.g., https://github.com/user/repo)
2. Click the green "Code" button
3. Click the copy button next to the HTTPS or SSH URL
4. The extension will automatically copy `git clone <url>` to your clipboard
5. You'll see a "✓ Copied git clone!" confirmation message
6. Paste directly into your terminal and press Enter

### Example

**Before (without extension):**
- Clicking copy gives you: `https://github.com/user/repo.git`
- You need to manually type: `git clone https://github.com/user/repo.git`

**After (with extension):**
- Clicking copy gives you: `git clone https://github.com/user/repo.git`
- Just paste and run!

## Supported URL Formats

The extension works with all GitHub clone URL formats:

- HTTPS with `.git`: `https://github.com/user/repo.git`
- HTTPS without `.git`: `https://github.com/user/repo`
- SSH with `.git`: `git@github.com:user/repo.git`
- SSH without `.git`: `git@github.com:user/repo`

## How It Works

The extension uses a content script that:
1. Listens for click events on GitHub's `<clipboard-copy>` elements
2. Detects when the click is on a clone URL copy button
3. Extracts the repository URL
4. Prepends `git clone ` to the URL
5. Copies the modified text to your clipboard
6. Shows visual feedback

## Packaging

To package the extension for distribution:

```bash
cd /tmp/github-plugin
zip -r github-clone-prepender.xpi manifest.json icons/ content-scripts/ README.md
```

You can then install the `.xpi` file by dragging it into Firefox or using `about:addons`.

## Development

### File Structure

```
github-plugin/
├── manifest.json                          # Extension manifest
├── icons/
│   ├── icon-16.png                       # 16x16 icon
│   ├── icon-48.png                       # 48x48 icon
│   └── icon-128.png                      # 128x128 icon
├── content-scripts/
│   └── github-clone-prepender.js         # Main content script
└── README.md                              # This file
```

### Debugging

To enable debug logging:

1. Open `content-scripts/github-clone-prepender.js`
2. Change `const DEBUG = false;` to `const DEBUG = true;`
3. Reload the extension in `about:debugging`
4. Open browser console (F12) while on GitHub
5. Look for messages prefixed with `[GitHub Clone Prepender]`

### Testing

Test the extension on different scenarios:

- [ ] Public repositories
- [ ] Private repositories (if you have access)
- [ ] Organization repositories
- [ ] Both HTTPS and SSH URLs
- [ ] Repositories with special characters in names
- [ ] Verify other copy buttons (code snippets, etc.) are not affected

## Compatibility

- Firefox 54.0 or later
- GitHub.com (GitHub Enterprise not tested)

## Privacy

This extension:
- Runs only on GitHub.com pages
- Does not collect any data
- Does not make any network requests
- Does not access other websites
- Operates entirely locally in your browser

## Known Limitations

- Only works on GitHub.com (not GitLab, Bitbucket, or other platforms)
- Requires GitHub's standard UI (may not work with custom themes that heavily modify the DOM)
- Temporary installations (via about:debugging) are removed when Firefox restarts

## Troubleshooting

### Extension doesn't work

1. Check that the extension is enabled in `about:addons`
2. Verify you're on a GitHub repository page
3. Try reloading the page (F5)
4. Check browser console for errors (F12)

### Copy button doesn't respond

1. Make sure you're clicking the copy button in the clone dropdown
2. Try closing and reopening the clone dropdown
3. Check if other GitHub copy buttons work (e.g., in code blocks)
4. Reload the extension in `about:debugging`

### Wrong text copied

1. Enable debug mode (see "Debugging" section)
2. Check console output to see what URL was detected
3. Report an issue with the repository URL that failed

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## License

MIT License - feel free to use, modify, and distribute.

## Acknowledgments

Inspired by Bitbucket's native "git clone" prefix feature.
