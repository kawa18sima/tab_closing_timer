let app = new Vue({
  el:"#app",
  data: {
    time:0,
    limitString:'',
    createdTimer:false,
    tabInfo:{}
  },
  methods:{
    createTimer:function(){
      let array = this.limitString.split(':').map((ele)=> ele - 0);
      this.limitTime = timer(array) + returnTime();

      if(this.limitTime/3600 >= 24){
        this.limitTime -= 24 * 3600;
      }
      chrome.storage.local.get(['close_tab'],function(data){
        let closeInfo = data.close_tab;
        chrome.tabs.query({active: true, currentWindow:true}, function(tab){
          this.tabInfo = {url: tab[0].url, limit: this.limitTime, tab:tab[0].id};
          console.log(this.tabInfo.tab);
          closeInfo.push(this.tabInfo);
          chrome.storage.local.set({close_tab: closeInfo}, ()=>{});
        }.bind(this));
      }.bind(this));
      this.createdTimer = true;
    }
  },
  created:function(){
    chrome.storage.local.get(['close_tab'], function(data){
      chrome.tabs.query({active: true, currentWindow:true}, function(tab){
        data.close_tab.forEach(function(ele){
          if(tab[0].url === ele.url){
            this.createdTimer = true;
            this.tabInfo = ele;
          }
        }.bind(this));
      }.bind(this));
    }.bind(this));
  }
});

setInterval(()=>{
  if(app.createdTimer){
    app.time =  app.tabInfo.limit - returnTime();
    if(app.time < 0) app.time += 24*3600;
  }
}, 200);

