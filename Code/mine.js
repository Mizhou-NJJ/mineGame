

            var mineChilds=document.getElementsByTagName("button");
            var gameDiv=document.getElementById("game");
            var mineDistribution;  //存放有雷的对象
            var flag=0;
            var startFalg;
            innnerNeedData();

            function innnerNeedData(){
                // var gameSize=document.getElementById("select").value;
                var gameSize=Number.parseInt(document.getElementById("select").value);
                var mineCount=document.getElementById("mineCount").value==""? defaultMineCount(gameSize):Number.parseInt(document.getElementById("mineCount").value);
                flag=mineCount;
                startFalg=flag;
                innerFlag();
                mineDistribution=new Array(mineCount);
                 buildUI(gameSize);
                 addEvent();
                 innerRandom(mineCount,gameSize*gameSize);
            }
        

            //默认要放置的雷数目
       function defaultMineCount(size){
           if(size=="9"){
               return 15;
           }
           else if(size=="10") return 25;

           else if(size=="15") return 50;
           else return 1;
       }
        
        
        function buildUI(mineNumber){
            //创建游戏界面
            for(var col=0;col<mineNumber;col++){
                var rowDiv=document.createElement("div");
                for(var row=0;row<mineNumber;row++ ){
                    var theSite=document.createElement("button");
                    rowDiv.appendChild(theSite);
                }
                gameDiv.appendChild(rowDiv);
            }
        }

        function addEvent(){
            /**
             * 
             * 为格子添加事件监听器
            */
         for(var i=0;i<mineChilds.length;i++){
             mineChilds[i].addEventListener("click",function(){
                //  this.style.backgroundColor="";
                //  this.innerHTML=""
                 var eventObj=this;

                 clickAction(eventObj);
             });
             mineChilds[i].addEventListener("contextmenu",function(){
                 event.preventDefault();
                 if(this.textContent==""){
                     this.innerText="🚩";
                     flag--;
                     innerFlag();
                 }
                 else{
                     flag=flag<startFalg?flag+=1:flag;
                     innerFlag();
                     this.innerText="";
                 }
                 
             });
         }
        }


        function clickAction(eventObj){
            //左击格子时要发生什么
            var n=0;
            for(var i=0;i<mineDistribution.length;i++){
                if(eventObj==mineDistribution[i]){
                    eventObj.style.backgroundColor="aliceblue";
                    eventObj.innerHTML="💥";
                    showAll();
                    gameOver();
                    break;
                }
                else{
                
                    for(var x=0;x<mineChilds.length;x++){
                        if(eventObj==mineChilds[x]){
                            n=x;
                            break;
                        }
                    }
                    eventObj.style.backgroundColor="aliceblue";
                    // eventObj.innerHTML=tipNum(eventObj,n,9);
                    if(tipNum(eventObj,n,9)==0){
                        eventObj.innerHTML="";
                    }
                    else{
                        eventObj.innerHTML=tipNum(eventObj,n,9);
                    }
                    
                }
            }
            
            
           
        }
        
        function innerRandom(howManeyMine,allMineSite){
            /**
             * 初始化地图，放置雷
             * 
             * howManeyMine  这把游戏中要放置几颗雷？
             * allMIneSite   总的有多少格子
            */
            var randomNum=new Array(howManeyMine);

            for(var m=0;m<howManeyMine;m++){
                randomNum[m]=Number.parseInt(Math.random()*allMineSite);
                for(var c=0;c<m;c++){
                   if(randomNum[m]==randomNum[c]){
                       randomNum[m]=checkNumber(randomNum[m],randomNum[c],allMineSite);
                   }
                }
               
            }


            for(var i=0;i<howManeyMine;i++){
                mineDistribution[i]=mineChilds[randomNum[i]];//Number.parseInt(Math.random()*allMineSite)
            }
        }


        function tipNum(eventObj,n,size){
            /**
             * 这个方法用来放置提示数字
             * 
             * eventObj-----触发事件的对象
             * n------------该对象在数组中的位置
             * size---------游戏为因该为size*size
             * */  
            var count=0;
            //最上面的格子
            if(n>0&&n<size-1){
                for(var i=0;i<mineDistribution.length;i++){
                    if(mineChilds[n-1]==mineDistribution[i]||
                    mineChilds[n+1]==mineDistribution[i]||
                    mineChilds[n+size-1]==mineDistribution[i]||
                    mineChilds[n+size+1]==mineDistribution[i]||
                    mineChilds[n+size]==mineDistribution[i]){

                        count++;
                    }
                }
            }

            //最下面的格子
            else if(n>(size-1)*size&&n<size*size-1){
                for(var i=0;i<mineDistribution.length;i++){
                    if(mineChilds[n-1]==mineDistribution[i]||
                    mineChilds[n+1]==mineDistribution[i]||
                    mineChilds[n-size+1]==mineDistribution[i]||
                    mineChilds[n-size-1]==mineDistribution[i]||
                    mineChilds[n-size]==mineDistribution[i]){

                        count++;
                    }
                }
            }

            //左侧格子
            else if(n%size==0&&n<(size-1)*size){
                for(var i=0;i<mineDistribution.length;i++){
                    if(mineChilds[n-size+1]==mineDistribution[i]||
                    mineChilds[n+size+1]==mineDistribution[i]||
                    mineChilds[n+1]==mineDistribution[i]||
                    mineChilds[n-size]==mineDistribution[i]||
                    mineChilds[n+size]==mineDistribution[i]){

                        count++;
                    }
                }
            }

            //右侧格子
            else if((n+1)%size==0&&n<(size-1)*size){
                for(var i=0;i<mineDistribution.length;i++){
                    if(mineChilds[n-size-1]==mineDistribution[i]||
                       mineChilds[n+size-1]==mineDistribution[i]||
                       mineChilds[n-1]==mineDistribution[i]||
                       mineChilds[n-size]==mineDistribution[i]||
                       mineChilds[n+size]==mineDistribution[i]){

                        count++;
                       }
                }
            }
            

            //左上角
            else if(n==0){
                for(var i=0;i<mineDistribution.length;i++){
                    if(mineChilds[n+1]==mineDistribution[i]||
                       mineChilds[n+size]==mineDistribution[i]||
                       mineChilds[n+size+1]==mineDistribution[i]){
                           
                        count++;
                       }
                }
            }

            //右上角
            else if(n==size-1){
                for(var i=0;i<mineDistribution.length;i++){
                    if(mineChilds[n-1]==mineDistribution[i]||
                       mineChilds[n+size]==mineDistribution[i]||
                       mineChilds[n+size-1]==mineDistribution[i]){

                        count++;
                       }
                }
            }

            //右下角
            else if(n==size*size-1){
                for(var i=0;i<mineDistribution.length;i++){
                    if(mineChilds[n+1]==mineDistribution[i]||
                       mineChilds[n-size]==mineDistribution[i]||
                       mineChilds[n-size+1]==mineDistribution[i]){
                           count++;
                       }
                }
            }

            //左下角
            else if(n==(size-1)*size){
                for(var i=0;i<mineDistribution.length;i++){
                    if(mineChilds[n-1]==mineDistribution[i]||
                       mineChilds[n-size]==mineDistribution[i]||
                       mineChilds[n-size-1]==mineDistribution[i]){
                           count++;
                       }
                }
            }


            //其它格子
            else{
            for(var i=0;i<mineDistribution.length;i++){  //该对象是否有雷
                if(mineChilds[n-size]==mineDistribution[i]||
                mineChilds[n+size]==mineDistribution[i]||
                mineChilds[n-1]==mineDistribution[i]||
                mineChilds[n+1]==mineDistribution[i]||
                mineChilds[n-size-1]==mineDistribution[i]||
                mineChilds[n-size+1]==mineDistribution[i]||
                mineChilds[n+size+1]==mineDistribution[i]||
                mineChilds[n+size-1]==mineDistribution[i]){

                    count++;
                }
            }
        }
            return count;
        }


        function test(){
            /**
             * 测试用的方法
            */
            // window.alert("hello");
            for(var i=0;i<mineDistribution.length;i++){
                window.alert(mineDistribution[i]);
            }
        }


        function checkNumber(willChangeNum,actNum,allMIneSite){
            /**
             * 这个方法用来确保之后生成的随机数不会与之前的相等
             * 
             * 
             * willChangeNum 要该变的数字
             * actNum 与之对照的数字
             * allMineSite 随机数生成的范围
            */
            willChangeNum=Number.parseInt(Math.random()*allMIneSite);
            if(willChangeNum==actNum) return checkNumber(willChangeNum,actNum,allMIneSite);
            else return willChangeNum;
        }

        function showAll(){
           
           for(var m=0;m<mineChilds.length;m++){
               for(var i=0;i<mineDistribution.length;i++){
                   if(mineChilds[m]==mineDistribution[i]){
                       mineChilds[m].style.backgroundColor="aliceblue";
                       mineChilds[m].innerHTML="💥";
                   }
               }
           }
        }
        
        function innerFlag(){
            document.getElementById("flag").innerHTML="<b>"+flag+"</b>";
        }

      function gameOver(){
          var overDiv=document.getElementById("over");
          overDiv.style.display="block";
      }
            
    