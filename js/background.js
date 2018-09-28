chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.set({close_tab: []}, function() {});
});

setInterval(()=>{
  chrome.storage.local.get(['close_tab'], function(data){
    data.close_tab.forEach(tab =>{
      if(tab.limit === returnTime()){
        chrome.tabs.remove(tab.tab);
        let storageInfo = data.close_tab.filter(closeTab => closeTab.tab !== tab.tab);
        chrome.storage.local.set({close_tab:storageInfo}, ()=>{});
      }
    });
  });
}, 200);
