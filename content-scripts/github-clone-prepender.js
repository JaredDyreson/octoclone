(function() {
  'use strict';

  const DEBUG = true;

  function log(...args) {
    if (DEBUG) console.log('[GitHub Clone Prepender]', ...args);
  }

  function isGitHubCloneUrl(url) {
    if (!url) return false;
    return (
      /^https:\/\/github\.com\/[\w-]+\/[\w.-]+(?:\.git)?$/.test(url) ||
      /^git@github\.com:[\w-]+\/[\w.-]+(?:\.git)?$/.test(url)
    );
  }

  function findUrlInput(button) {
    // New GitHub UI: button is sibling to the input
    // Structure: <input><button>
    const parent = button.parentElement;
    if (!parent) return null;

    // Look for input in the same container
    const input = parent.querySelector('input[id*="clone"]') ||
                  parent.querySelector('input[value*="github.com"]') ||
                  parent.querySelector('input[readonly]');

    if (input && input.value) {
      log('Found input field:', input.id, input.value);
      return input;
    }

    return null;
  }

  function isCloneDropdownButton(element) {
    // Check if this is the copy button in GitHub's new UI
    const button = element.closest('button[data-component="IconButton"]');
    if (!button) return false;

    // Check if button has the copy icon
    const hasCopyIcon = button.querySelector('.octicon-copy');
    if (!hasCopyIcon) return false;

    // Check if there's a URL input nearby
    const input = findUrlInput(button);
    if (!input) {
      log('Button has copy icon but no URL input found');
      return false;
    }

    // Check if it's a GitHub clone URL
    if (!isGitHubCloneUrl(input.value)) {
      log('Found input but not a clone URL:', input.value);
      return false;
    }

    log('Detected clone button!');
    return true;
  }

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      log('Successfully copied to clipboard:', text);
      return true;
    } catch (err) {
      console.error('[GitHub Clone Prepender] Copy error:', err);
      return false;
    }
  }

  function showFeedback(button) {
    // Store original content
    const originalHTML = button.innerHTML;
    const originalAriaLabel = button.getAttribute('aria-labelledby');

    // Update button with checkmark icon
    const checkSvg = `<svg aria-hidden="true" focusable="false" class="octicon octicon-check" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style="color: #28a745;"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path></svg>`;
    button.innerHTML = checkSvg;
    button.setAttribute('aria-label', 'Copied git clone command!');

    // Reset after 2 seconds
    setTimeout(() => {
      button.innerHTML = originalHTML;
      if (originalAriaLabel) {
        button.setAttribute('aria-labelledby', originalAriaLabel);
      } else {
        button.removeAttribute('aria-label');
      }
    }, 2000);
  }

  async function handleCloneButtonClick(event) {
    const target = event.target;

    if (!isCloneDropdownButton(target)) {
      return;
    }

    log('Clone button clicked!');

    const button = target.closest('button[data-component="IconButton"]');
    const input = findUrlInput(button);

    if (!input || !input.value) {
      log('No URL input found');
      return;
    }

    const originalUrl = input.value;

    if (!isGitHubCloneUrl(originalUrl)) {
      log('Not a valid GitHub clone URL:', originalUrl);
      return;
    }

    // Prevent default copy behavior
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    // Copy modified text
    const modifiedText = `git clone ${originalUrl}`;
    const success = await copyToClipboard(modifiedText);

    if (success) {
      // Show visual feedback
      showFeedback(button);
      log('Copied modified URL:', modifiedText);
    }
  }

  // Attach event listener in capture phase to intercept early
  document.addEventListener('click', handleCloneButtonClick, true);

  log('GitHub Clone Prepender initialized');

})();
