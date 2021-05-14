chrome.commands.onCommand.addListener(function (command) {
  
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    tab = tabs[0];
    if(!tab) {
      // Turns out that an extension can't close devtools.

      // chrome.windows.getAll({ windowTypes: ["devtools"], populate: true }, (devtools_windows) => {
      //   for(devtools_window of devtools_windows) {
      //     if(!devtools_window.focused) continue;
      //     for(devtools_tab of devtools_window.tabs) {
      //       if(!devtools_tab.active) continue;
      //       console.log(devtools_window);
      //       chrome.windows.remove(devtools_window.id, function () {});
      //     }
      //   }
      // });

      // So, Ctrl-W would be a no-op on devtools.
      return;
    } else if (tab.pinned) {
      chrome.tabs.query(
        { pinned: false, currentWindow: true },
        function (unpinned_tabs) {
          if (unpinned_tabs) {
            unpinned_tabs.sort((a, b) => a.index - b.index);
            // console.log(unpinned_tabs);
            unpinned_tab = unpinned_tabs[0];
            chrome.tabs.update(unpinned_tab.id, { active: true });
          }
        }
      );
      return;
    } else {
      chrome.tabs.remove(tab.id, function () {});
    }
  });
});
