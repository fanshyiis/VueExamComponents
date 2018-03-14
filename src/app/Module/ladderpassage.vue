<template>
  <div style="height:100%">
  <div class="message" v-if="messageShow" style="padding:10px">
    <img style="width:36px;margin-top:26px;" src="../../assets/cancle.png">
  <div style="line-height:26px;font-size:15px;margin-top:5px;">{{messageText}}</div>
</div>
<div class="message" v-if="messageShow2" style="padding:10px">
  <div style="line-height:26px;font-size:15px;margin-top:25px;">{{messageText}}</div>
</div>
<div class="bac_submit" v-if="submit">
<div class="message" style="padding:10px">
    <i-col class="demo-spin-col" style="margin-top:20px;">
        <Spin fix>
            <Icon type="load-c" size=18 class="demo-spin-icon-load" style="font-size:24px"></Icon>
            <div>正在提交</div>
        </Spin>
    </i-col>
</div>
</div>
  <div class="main" v-show="about">
    <div class="header">
    <!-- sss -->
<!--       <img class="img_header" style="margin-right: 2em;" src="../../assets/book.png"> -->
      <img class="img_header" style="margin-right: 15px;" src="../../assets/set.png" @click="showSet = !showSet">
      <img class="img_header2" style="margin-left: 15px;" src="../../assets/bac2.png" @click="Quit()">
      <div class="clock_top" v-if="!examStatus"><Icon type="ios-clock"></Icon> {{time.f}} : {{time.m}}</div>
    </div>

    <div class="headerSet" :class="[{ScrollSet: !showSet}]">

      <cell title="字体大小" primary="content" class="range">
        <range :minHTML="min" :maxHTML="max" v-model="fontSize" @on-change="onChange" :min="14" :max="30"></range>
      </cell>
      <div class="range">
        <div class="title_set" style="float:left">背景颜色</div>
        <div class="set_color" :class="[{activeColor: index === colorIndex}]" v-for="(item, index) in color" :style="{backgroundColor: item}" @click="colorIndex = index">
          <Icon v-show="index === colorIndex" type="checkmark-circled" class="dui"></Icon>
          <div v-show="index === 1" class="hy">护眼</div>
        </div>
      </div>
    </div>
    <div class="content"  :class="{ani: aniM}" :style="{backgroundColor: color[colorIndex], height: contentHeight}">
      <scroller lock-x :height="'100%'" :Key="'sss' + SKey">
      <div style="padding-top:30px">
      <template  v-if="passageTask">
      <div class="title">
        {{passageTask.stepMeta.title}} 
        <!-- {{user}} -->
      </div>
      <div class="info clear">
        <div class="info_1">
          <div class="clear"><div style="float:left"><img src="../../assets/erbook.png" style="width:18px"></div><span style="font-size:14px;color:#999;line-height:18px;padding-left:4px;padding-top:-4px">{{passageTask.stepMeta.wordCount}} 字</span></div>
          <span style="font-size:14px;color:#999">推荐阅读时间：{{suggestReadTime}}分</span>
        </div>
      </div>
      <div class="passage" :style="{fontSize: fontSize + 'px', lineHeight: fontSize * 2 + 'px'}" v-html="passageBody">
      </div>
      </template>
    </div>
  </scroller>
    </div>
    <template v-if="passageTask">
    <div class="change" v-show="showChange">
      <v-touch v-on:panmove="onPanup" v-on:panend="onPanend">
        <div class="test">
          <img class="icon_up" src="../../assets/icon_la.png">
          <img class="icon_left" src="../../assets/icon_test.png">
          <img class="icon_info" src="../../assets/hand.png">
          <div style="float:left">挑战题</div>
          <div @click="goBackModal()" style="float:right;font-size:40px;width:50px;text-align:center"><Icon type="ios-close-empty"></Icon></div>
        </div>
       </v-touch>
       <div style="width:100%;overflow:hidden">
       <Row>
          <Col :style="'width:'+ (100/passageTask.examRecord.questions.length) +'%;float:left'" v-for="(item, index) in passageTask.examRecord.questions" :key="'top' + index">
           <div class="item" :class="{active: swiperItemIndex === index}" @click="swiperItemIndex = index">
            <div class="ans_all">
              <div class="item_index">{{index + 1}}</div>
              <div class="item_ans" :class="{correct: !item.correct&& examStatus}">{{ans[item.ans - 1]}}</div>
            </div>
           </div>
          </Col>
        </Row>
      </div>
      <swiper :height="(880) + 'px'" :key="'swiperBottom'" v-model="swiperItemIndex" ref="swiperBottom" :show-dots="false" :min-moving-distance="20" :threshold="60">
      <swiper-item v-for="(item, index) in passageTask.examRecord.questions" :key="'ques' +index" :height="'100%'" v-if="!examStatus">
        <div class="setHeight" style="background-color:#effaff">
        <div class="scroller_c2 bac222" id="content" :key="'question' + index">
          <div class="q_title"><div class="tag_t">问</div>{{item.title}}</div>
          <div class="item_content">
          <div class="q_item clear" :class="{active_item:item.ans === ans.id}" v-for="ans in item.options" @click="setAnswer(index, ans.id)">
            <div class="q_item_1"><div class="zm">{{AnsIndex[ans.id - 1]}}</div></div>
            <div class="q_item_2">{{ans.content}}</div>
          </div>
        </div>
      </div>
      </div>
      </swiper-item>
      <swiper-item v-for="(item, index) in passageTask.examRecord.questions" :key="'ques' +index" :height="'100%'" v-if="examStatus">
        <div class="setHeight" style="background-color:#effaff">
        <div class="scroller_c2  bac222" id="content" :key="'question' + index">
          <div class="q_title"><div class="tag_t">问</div>{{item.title}}</div>
          <div class="item_content">
          <div class="q_item clear" :class="{active_item:item.correctId === ans.id, active_item_error: item.ans === ans.id && !item.correct }" v-for="ans in item.options">
            <div class="q_item_1"><div class="zm">{{AnsIndex[ans.id - 1]}}</div><div class="icon_l" v-if="item.correctId === ans.id"><Icon type="ios-checkmark-empty"></Icon></div><div class="icon_l" v-if="item.ans === ans.id && !item.correct"><Icon type="ios-close-empty"></Icon></div></div>
            <div class="q_item_2">{{ans.content}}</div>
          </div>
          <div class="q_title" v-if="item.correctReason"><div class="tag_t2">解析</div>{{item.correctReason}}</div>
        </div>
      </div>
      </div>
      </swiper-item>
     </swiper>
    </div>
    </template>
    <template v-if="passageTask">
    <div class="bottom2" v-show="showChange && !examStatus">
      <div v-if="swiperItemIndex === passageTask.examRecord.questions.length - 1"><div class="touch_left2">最后一题</div></div>
      <div v-else><img class="touch_left" src="../../assets/touchLeft.png"></div>
      <div class="btn_submit2" @click="message2('你阅读的太快，请仔细阅读噢')" v-if="swiperItemIndex === passageTask.examRecord.questions.length - 1 && !submitStatus">提交</div>
      <div class="btn_submit" @click="goSubmit()" v-if="swiperItemIndex === passageTask.examRecord.questions.length - 1 && submitStatus">提交</div>
    </div>
    </template>
    <div class="bottom" :class="[{Scroll2: headerPoint || showChange}]">
      <div class="bottom_item1" v-if="!isLike" @click="Favorite(0)"><img style="height:32px;margin-top:9px" src="../../assets/star.png"></div>
      <div class="bottom_item1" v-if="isLike" @click="Favorite(1)"><img style="height:32px;margin-top:9px" src="../../assets/star2.png"></div>
      <div class="bottom_item_left" v-if="!examStatus">
        <img class="btn_btm" src="../../assets/btn_btm.png">
        <div class="go" @click="goToChange()">去挑战</div>
      </div>
      <div class="bottom_item_left" v-if="examStatus">
        <img class="btn_btm" src="../../assets/btn_btm.png">
        <div class="go" @click="goToChange()">查看挑战题</div>
      </div>
      <div class="bottom_item2" @click="goShare()"><img style="height:32px;margin-top:9px" src="../../assets/share.png"></div>
    </div>
  </div>
  <div class="main" style="height:100%;overflow-y: scroll" v-if="!about">
    <div class="header2">
      <div class="back_out" @click="about =!about"><img class="back" src="../../assets/back.png" ></div>
      <img src="../../assets/header.png">
      <img class="koala" src="../../assets/koala_little.png">
    </div>
    <div class="content_passage">
    <div class="tag1 tag_header">
      <Icon type="ios-bolt" class="flash"></Icon>小菜一碟
    </div>
    <div class="dis_contnet">短文/图书的ER值低于你的适读范围，阅读此类文本对你来说非常容易</div>
    <div class="tag tag_header">
      <Icon type="ios-bolt" class="flash"></Icon>适宜阅读
    </div>
    <div class="dis_contnet">短文/图书的ER值在你的适读范围区间内，此范围的文本你可以读懂70%-90%的；跟读其他范围的书籍相比，读此范围的书籍可以1.5倍的提升你的阅读能力</div>
    <div class="tag2 tag_header">
      <Icon type="ios-bolt" class="flash"></Icon>具有挑战
    </div>
    <div class="dis_contnet">短文/图书的ER值超过你的适读范围区间，阅读此类文本对你来说比较费力</div>
    </div>
  </div>
  <div class="dictionary" style="text-align:center" :class="[{showDictionary: showDic}]">
<!--     <div class="dicText" id="selectText">"{{selectText}}"</div> -->
    <!-- <img style="width:200px;margin-top:100px;" src="../../assets/loading.gif"> -->
    <div class="loadDic">加载中...</div>
<!--     <div class="loadDic" v-show="noDic"> 暂无释义</div>
    <div class="go dicGoBack" @click="showDic = !showDic">返回</div> -->
  </div>
  <div class="dictionary2" v-if="showBack">
    <div class="sure_modal">
      <div class="info_alert">确定退出挑战?</div>
      <div class="">
        <div @click="Quit()" class="alert_item" style="border-right:1px solid #e8e8e8">退出</div>
        <div @click="showBack = false" class="alert_item" style="color:#00aeff">继续挑战</div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
  import gql from 'graphql-tag'
  const PassageStudentTask = gql`query PassageStudentTask($taskId: Long!, $grade: Int!){
     stepStudentTask(id: $taskId) {
          id
          status
          type
          examRecord {
            id
            answer {
              correct
              questionId
              answer
              correct
              statisticInfo{
                usedTime
              }
            }
            questions {
              questionId
              title
              body
              correctId
              correctReason
              options {
                id
                content
              }
            }
          }
          stepMeta {
            wordCount
            id
            title
            erScore
            content
            questionNum
            readingTime(grade: $grade)
          }
       }
     
  }`
  import { Swiper, SwiperItem, XButton, Range, Group, GroupTitle, Cell, Scroller } from 'vux'
  export default {
    data () {
      return {
        suggestReadTime: null,
        taskId: null,
        color: ['#fff', '#C7EDCC', '#f7efd2', '#eae8dd', '#b0dfe6'],
        about: true,
        headerPoint: false,
        showSet: false,
        fontSize: 18,
        min: '<div style="font-size:16px;width:40px;text-align:left">小</div>',
        max: '<div style="font-size:24px;width:40px;">大</div>',
        colorIndex: 0,
        selectText: null,
        clientHeight: 667,
        showDic: false,
        noDic: false,
        loadDic: false,
        questions: ['1', '2', '3', '4'],
        swiperItemIndex: 0,
        ans: ['A', 'B', 'C', 'D'],
        contentHeight: '50%',
        position: 0,
        positionEnd: 0,
        showChange: true,
        aniM: true,
        showBack: false,
        passageTask: null,
        AnsIndex: ['A', 'B', 'C', 'D'],
        TimeStart: null,
        TimeEnd: null,
        typeName: null,
        messageShow: false,
        messageShow2: false,
        messageText: '',
        user: null,
        userId: null,
        passageId: null,
        isLike: false,
        passageBody: null,
        examStatus: false,
        resultAn: '',
        submit: false,
        timeOut: 0,
        submitStatus: false,
        startTimeTop: 0,
        time: {
          f: '00',
          m: '00'
        }
      }
    },
    components: {
      Scroller,
      Swiper,
      SwiperItem,
      Range,
      Group,
      GroupTitle,
      Cell,
      XButton
    },
    methods: {
      Favorite (num) {
        console.log(this.passageId)
        if (num === 0) {
          this.axios({
            baseURL: 'https://www.enjoyreading.net',
            method: 'POST',
            url: `/books/web/passage/favoriteIsland?passageId=${this.passageId}`
          })
          .then(res => {
            this.message2()
            this.isLike = true
          })
          .catch(err => {
            this.message(err.response.data.message)
          })
        } else {
          this.axios({
            baseURL: 'https://www.enjoyreading.net',
            method: 'DELETE',
            url: `/books/web/passage/favorite/${this.passageId}`
          })
          .then(res => {
            this.message('取消收藏')
            this.isLike = false
          })
          .catch(err => {
            this.message(err.response.data.message)
          })
        }
      },
      goShare () {
        // this.user = '11111'
        setTimeout(() => {
          window.AndroidWebView.share()
        }, 100)
        window.webkit.messageHandlers.share.postMessage('')
      },
      goSubmit () {
        if (this.submit) {
          return false
        } else {
          this.submit = true
          setTimeout(() => {
            if (this.submit) {
              this.submit = false
              this.message('网络有点问题，请检查后重试')
            }
          }, 8000)
        }
        let answer = this.passageTask.examRecord.questions.map(val => {
          return {
            answer: {
              correctId: val.ans
            },
            correct: false,
            questionId: val.questionId,
            type: 1,
            statisticInfo: val.statisticInfo
          }
        })
        this.axios({
          baseURL: 'https://www.enjoyreading.net',
          method: 'POST',
          url: `/tasks/web/steps/studentTasks/${this.taskId}/submit`,
          data: answer
        })
        .then(res => {
          let d = 0
          let c = 0
          res.data.examRecord.answer.map(val => {
            if (val.correct) {
              d++
            } else {
              c++
            }
          })
          window.zhuge.track('成功完成老师任务(' + this.typeName + ')', {
            '任务类型': this.typeName,
            '短文Id': this.passageTask.stepMeta.id,
            '短文题目': this.passageTask.stepMeta.title,
            '短文ER': this.passageTask.stepMeta.erScore,
            '是否通过': res.data.hasPass ? '是' : '否',
            '对错信息': d + '对' + c + '错',
            '本次任务使用时间': this.startTimeTop
          })
          this.submit = false
          this.resultAn = res.data
          setTimeout(() => {
            window.AndroidWebView.getSubmitResult(JSON.stringify(this.resultAn))
          }, 100)
          window.webkit.messageHandlers.result.postMessage(Number(res.data.timestamp))
          console.log(res)
        })
        .catch(err => {
          // this.user = err.response.data
          if (err.response.data.code === 400) {
            this.message(err.response.data.message)
            setTimeout(() => {
              location.reload()
            }, 2000)
          } else {
            this.message('网络错误')
          }
          this.submit = false
        })
      },
      message (val) {
        this.messageShow = true
        this.messageText = val
        setTimeout(() => {
          this.messageShow = false
        }, 1000)
      },
      message2 (val) {
        this.messageShow2 = true
        this.messageText = val
        setTimeout(() => {
          this.messageShow2 = false
        }, 1000)
      },
      setAnswer (index, id) {
        this.TimeEnd = (new Date()).getTime()
        console.log(index, id)
        let que = this.passageTask.examRecord.questions
        que[index].ans = id
        que[index].statisticInfo.modifyCount ++
        que[index].statisticInfo.usedTime += this.TimeEnd - this.TimeStart
        if (index + 1 < que.length) {
          this.swiperItemIndex ++
        }
        console.log(que[index])
        this.TimeStart = (new Date()).getTime()
      },
      ladderStart () {
        this.axios({
          baseURL: 'https://www.enjoyreading.net',
          method: 'POST',
          url: `/tasks/web/steps/studentTasks/${this.taskId}/start`
        })
      },
      getPassage () {
        // this.showDic = true
        this.$apollo.query({
          query: PassageStudentTask,
          fetchPolicy: 'network-only',
          variables: {
            taskId: this.taskId,
            grade: Number(this.grade)
          }
        })
        .then(res => {
          // this.showDic = false
          this.TimeStart = (new Date()).getTime()
          setTimeout(() => {
            window.AndroidWebView.progressDismiss()
          }, 100)
          setTimeout(() => {
            window.webkit.messageHandlers.progressDismiss.postMessage('')
          }, 200)
          let result = JSON.parse(JSON.stringify(res.data.stepStudentTask))
          if (result.type && result.type === 'Step') {
            this.typeName = '阶梯'
          }
          if (result.type && result.type === 'SmartStep') {
            this.typeName = '智能阶梯'
          }
          // this.passageId = result.passage.id
          if (result.status === 'Completed') {
            this.examStatus = true
          } else {
            this.ladderStart()
          }
          this.suggestReadTime = result.stepMeta.readingTime
          this.timeOut = this.suggestReadTime * 60
          this.getTimeLimit()
          // this.isLike = result.passage.isLike
          if (this.examStatus) {
            result.examRecord.questions.map((val, index) => {
              val.correct = result.examRecord.answer[index].correct
              val.ans = result.examRecord.answer[index].answer
              val.statisticInfo = {
                modifyCount: 0,
                usedTime: 0
              }
            })
          } else {
            result.examRecord.questions.map(val => {
              val.statisticInfo = {
                modifyCount: 0,
                usedTime: 0
              }
              val.ans = 0
            })
          }
          console.log(result.examRecord.questions)
          this.passageTask = result
          let passageBody = result.stepMeta.content.replace(/img/g, 'img style="width:100%;display:block" class="cimg";')
          passageBody = passageBody.replace(/\s+/g, '')
          passageBody = passageBody.replace(/&nbsp;/g, '')
          passageBody = passageBody.replace(/<p>/g, '<p style="text-indent:36px">')
          this.passageBody = passageBody
          console.log(this.passageTask)
          setTimeout(() => {
            this.setH()
          }, 500)
          this.startTime()
          setTimeout(() => {
            this.TestPad()
          }, 1000)
          // console.log(res.data.passageTask)
        })
      },
      TestPad () {
        this.SKey++
      },
      startTime () {
        this.startTimeTop ++
        this.timeTrans(this.startTimeTop)
        setTimeout(() => {
          this.startTime()
        }, 1000)
      },
      timeTrans (val) {
        let f = parseInt(val / 60)
        let m = val % 60
        if (f < 10) {
          f = '0' + f
        }
        if (m < 10) {
          m = '0' + m
        }
        this.time.f = f
        this.time.m = m
      },
      Quit () {
        // alert(',,,,')
        let message = {
          a: '11',
          b: '22',
          c: '33'
        }
        setTimeout(() => {
          window.AndroidWebView.onBack()
        }, 100)
        window.webkit.messageHandlers.pop.postMessage(JSON.stringify(message))
      },
      goBackPassage () {
        this.showBack = false
        this.aniM = true
        this.showChange = false
        this.contentHeight = '100%'
        this.position = this.clientHeight / 2
        this.positionEnd = this.clientHeight / 2
        let child = document.getElementsByClassName('setHeight')
        for (var i = 0; i < child.length; i++) {
          child[i].setAttribute('style', 'height:' + (this.clientHeight - this.position - 100) + 'px')
        }
      },
      goBackModal () {
        if (this.examStatus) {
          this.Quit()
        } else {
          this.showBack = true
        }
      },
      goToChange () {
        this.TimeStart = (new Date()).getTime()
        this.showChange = true
        this.contentHeight = '50%'
        let child = document.getElementsByClassName('setHeight')
        if (this.examStatus) {
          for (var i = 0; i < child.length; i++) {
            child[i].setAttribute('style', 'height:' + (this.clientHeight - this.position) + 'px')
          }
        } else {
          for (var j = 0; j < child.length; j++) {
            child[j].setAttribute('style', 'height:' + (this.clientHeight - this.position - 100) + 'px')
          }
        }
      },
      onPanup (e) {
        this.aniM = false
        console.log(this.clientHeight - this.position)
        if (this.clientHeight - this.position <= 200) {
          this.position = this.clientHeight - 200
          this.contentHeight = this.position + 'px'
          return false
        } else {
          this.position = e.deltaY + this.positionEnd
          this.contentHeight = this.position + 'px'
          let child = document.getElementsByClassName('setHeight')
          if (this.examStatus) {
            for (var i = 0; i < child.length; i++) {
              child[i].setAttribute('style', 'padding-bottom:50px;height:' + (this.clientHeight - this.position - 100) + 'px')
            }
          } else {
            for (var j = 0; j < child.length; j++) {
              child[j].setAttribute('style', 'height:' + (this.clientHeight - this.position - 80) + 'px')
            }
          }
        }
      },
      setH () {
        let child = document.getElementsByClassName('setHeight')
        if (this.examStatus) {
          for (var i = 0; i < child.length; i++) {
            child[i].setAttribute('style', 'padding-bottom:50px;height:' + (this.clientHeight - this.position - 100) + 'px')
          }
        } else {
          for (var j = 0; j < child.length; j++) {
            child[j].setAttribute('style', 'height:' + (this.clientHeight - this.position - 80) + 'px')
          }
        }
      },
      onPanend (e) {
        if (this.clientHeight - this.position <= 200) {
          this.position = this.clientHeight - 201
          this.positionEnd = this.clientHeight - 201
        } else {
          this.positionEnd = this.positionEnd + e.deltaY
        }
      },
      onChange (val) {
        console.log(val)
      },
      getOkGet (xmlHttp) {
        if (xmlHttp.readyState === 1 || xmlHttp.readyState === 2 || xmlHttp.readyState === 3) {
          console.log('加载中')
        }
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
          let d = JSON.parse(xmlHttp.response)
          console.log(d)
        }
      },
      setCookie (cname, cvalue) {
        document.cookie = cname + '=' + cvalue + ';'
        console.info(document.cookie)
      },
      getTimeLimit () {
        let limit = parseInt(((this.suggestReadTime * 60) / 3) * 2)
        // let limit = parseInt((this.suggestReadTime * 60) * 2)
        setTimeout(() => {
          this.timeOut --
          if (this.timeOut < limit && !this.submitStatus) {
            this.submitStatus = true
          }
          this.getTimeLimit()
        }, 1000)
      },
      getDic (val) {
        this.loadDic = true
        // this.axios({
        //   method: 'GET',
        //   baseURL: 'http://apis.eolinker.com',
        //   url: '/common/dictionary/queryChineseWords',
        //   withCredentials: true,
        //   headers: {
        //     'Access-Control-Allow-Origin': 'http://apis.eolinker.com',
        //     'Access-Control-Allow-Credentials': true
        //   },
        //   params: {
        //     productKey: 'eAfSmds84eff40178816dae70a126ea36f5beba1bda7909',
        //     words: val
        //   }
        // })
        this.axios.post('http://apis.eolinker.com/common/dictionary/queryChineseWords?productKey=eAfSmds84eff40178816dae70a126ea36f5beba1bda7909&words=学校')
        .then(res => {
          this.loadDic = false
          if (res.statusCode === '000000') {
            this.DicRes = res.result
            console.log(this.DicRes)
          } else {
            this.noDic = true
          }
        })
        .catch(err => {
          console.log(err)
          this.loadDic = false
          this.noDic = true
        })
      }
    },
    created: function () {
      let query = window.location.href.split('?')[1]
      let taskId = Number(query.split('=')[1].split('&')[0])
      this.grade = Number(query.split('=')[2])
      if (!this.grade) {
        this.grade = 3
      }
      this.taskId = taskId
      console.log(this.grade)
      console.log(this.taskId)
      this.getPassage()
      this.testInfo = this.$route.query.testInfo
      document.getElementsByTagName('body')[0].setAttribute('style', 'min-width:320px!important;height:100%;position:relative')
      var oMeta = document.createElement('meta')
      oMeta.name = 'viewport'
      oMeta.content = 'width=device-width,initial-scale=1,user-scalable=0'
      document.getElementsByTagName('head')[0].appendChild(oMeta)
      // this.axios.post(`/users/open/login?account=S4758&password=123456`)
      this.clientHeight = document.documentElement.clientHeight
      this.position = this.clientHeight / 2
      this.positionEnd = this.clientHeight / 2
      this.axios({
        baseURL: 'https://www.enjoyreading.net',
        method: 'GET',
        url: `/users/web/user/current`
      })
      .then(res => {
        let user = res.data
        window.zhuge.identify(user.id, {
          name: user.name,
          avatar: user.headimg,
          '邮箱': user.email,
          '电话': user.tel,
          '性别': user.gender,
          'ER': user.erScore,
          '学校': user.school.name,
          '地区': user.school.address,
          // '班级': user.schoolClass,
          '年级': user.grade,
          '老师姓名': user.schoolClass ? user.schoolClass.teacherName : '',
          '老师ID': user.schoolClass ? user.schoolClass.teacherId : ''
        })
      })
    }
  }
</script>
<style scoped>
.clock_top{
  color: #b5d1eb;
  font-weight: 600;
  font-size: 22px;
  width: 200px;
  text-align: center;
  left: 50%;
  line-height: 50px;
  margin-left: -100px;
  position: absolute;
}
.tag_t{
  float: left;
  margin-right: 10px;
  width:30px;
  height:22px;
  font-size: 14px;
  line-height: 22px;
  border-radius: 6px;
  background-color:#fe7c5b;
  color:#fff;
  text-align:center;
}
.tag_t2{
  float: left;
  margin-right: 10px;
  width:55px;
  height:22px;
  font-size: 14px;
  line-height: 22px;
  border-radius: 6px;
  background-color:#fe7c5b;
  color:#fff;
  text-align:center;
}
.bac222{
  background-color: #fff;
}
.btn_btm{
  margin-top: 7px;
  position: absolute;
  width: 145px;
}
.bac_submit{
  z-index: 9999;
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0);
}
.demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
       font-size: 16px;
        position: relative;
    }
  .icon_l{
    position: absolute;
    top: 50%;
    margin-top: 4px;
    left: 50%;
    margin-left: -4px;
  }
  .message2{
    text-align: center;
    /*margin: auto;*/
    left: 50%;
    margin-left: -110px;
    top: 42%;
    color: #fff;
    width: 220px;
    background: rgba(0,0,0,.8);
    position: fixed;
    z-index: 9999;
    padding-bottom: 30px;
    min-height: 120px;
    border-radius: 8px;
  }
  .message{
    text-align: center;
    /*margin: auto;*/
    left: 50%;
    margin-left: -70px;
    top: 42%;
    color: #fff;
    width: 140px;
    background: rgba(0,0,0,.8);
    position: fixed;
    z-index: 9999;
    min-height: 120px;
    border-radius: 8px;
  }
  .active_item{
    color: #73b0fd;
    border: 1px solid #73b0fd!important;
    /*background-color: #d9f3ff;*/
  }
  .active_item_error .q_item_1{
    /*background: #ff5a5a!important;*/
    color: #fe7c5b;
  }
  .active_item_error .q_item_2{
    /*background: #ff5a5a!important;*/
    color: #fe7c5b;
  }
  .active_item_error{
    border: 1px solid #ff5a5a!important;
  }
  .active_item .q_item_1{
    /*background: #00aeff;*/
    color: #73b0fd;
  }
  .setHeight{
    padding-bottom: 104px;
  }
  .touch_left{
    margin-top: 9px;
    margin-left: 20px;
    height: 26px;
    float: left;
  }
  .touch_left2{
    margin-left: 20px;
    line-height: 44px;
    color: #fff;
    font-size: 15px;
    float: left;
  }
  .btn_submit{
    text-align: center;
    color: #fff;
    line-height: 44px;
    font-size: 16px;
    font-weight: 500;
    width: 90px;
    height: 44px;
    background-color: #00aeff;
    float: right;
    border-radius:0px 0px 0px 0px;
  }
  .btn_submit2{
    text-align: center;
    color: #fff;
    line-height: 44px;
    font-size: 16px;
    font-weight: 500;
    width: 90px;
    height: 44px;
    background-color: #777;
    float: right;
  }
  .alert_item{
    text-align: center;
    line-height: 44px;
    font-size: 15px;
    float: left;
    width: 50%;
  }
  .info_alert{
    text-align: center;
    line-height: 76px;
    font-size: 16px;
    height: 76px;
    border-bottom: 1px solid #e8e8e8;
  }
  .sure_modal{
    position: absolute;
    top:50%;
    left: 50%;
    margin-left: -130px;
    margin-top: -60px;
    width: 260px;
    height: 120px;
    background-color: #fff;
    border-radius: 5px;
  }
  .change{
    /*position: fixed;*/
    bottom: -50px;
    margin-top: -20px;
  }
  .scroller_c2{
    height: 100%;
    overflow-y: scroll;
  }
  .scroller_c2::-webkit-scrollbar {
    display: none
  }
  .active .item_ans{
    color: #fff;
    /*background-color: #4b9aff!important*/
  }
  .active{
    background-color: #b8dafb;
  }
  .q_item {
    border:1px solid #fff;
    -webkit-box-shadow:0 0 8px rgba(39,151,255, .15);
    -moz-box-shadow:0 0 8px rgba(39,151,255, .15);
    box-shadow:0 0 8px rgba(39,151,255, .15);
    margin-left: 45px;
    position: relative;
    min-height: 40px;
    margin-bottom: 20px;
    margin-right: 20px;
    border-radius: 5px;
    padding-left: 10px;
  }
  .q_item_1 {
    position: absolute;
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    width: 10%;
    line-height: 100%;
    height: 100%;
    float: left;
  }

  .q_item_2 {
    margin-left: 10%;
    padding-bottom: 15px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 15px;
    font-size: 15px;
    width: 90%;
    float: left;
  }

  .q_title {
    padding: 10px;
    /*margin-left: 10pxl*/
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 600;
  }
  .ans_all {
    margin: auto;
    width: 50px;
  }

  .item_index {
    font-weight: 500;
    font-size: 16px;
    line-height: 30px;
    float: left;
  }
  .correct{
    border:1px solid #ff5a5a!important;
    color: #fff!important;
    background: #ff5a5a!important
  }
  .zm{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -10px;
    margin-left: -7px;
  }
  .item_ans {
    background-color: #2797ff;
    margin-top: 5px;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    margin-left: 18px;
    text-align: center;
    line-height: 28px;
    border-radius: 15px;
    border:1px solid #2797ff;
    width: 30px;
    height: 30px;
  }
  .icon_up {
    left: 50%;
    margin-left: -29px;
    top: -15px;
    width: 58px;
    position: absolute;
  }
  .icon_info{
    left: 34%;
    top: -10px;
    width: 32%;
    position: absolute;
  }
  .icon_left {
    margin-right: 5px;
    margin-left: 12px;
    margin-top: 17px;
    float: left;
    width: 16px;
  }
  .test {
    border-radius: 8px 8px 0px 0px;
    position: relative;
    line-height: 50px;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
    width: 100%;
    height: 50px;
    background-color: #2797ff;
  }
  .item {
    padding-top: 5px;
    height: 50px;
    /*background-color: #f3f3f3*/
  }
  .item_title {
    line-height: 40px;
    text-align: center;
    height: 40px;
  }
  .dicGoBack{
    position: absolute;
    right: 40px;
    bottom: 40px;
  }
  .loadDic{
    height: 200px;
    text-align: center;
    font-size: 20px;
    line-height: 100px;
    color: #999;
  }
  .dicText{
    font-weight: 500;
    font-size: 40px;
  }
  .showDictionary{
    top: 0!important;
  }
  .dictionary{
    padding: 25px;
    transition: .4s ease-in-out;
    top: 100%;
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: 9999;
    background-color: rgba(255, 255, 255, .92);
  }
  .dictionary2{
    top: 0;
    transition: .4s ease-in-out;
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: 9999;
    background-color: rgba(0, 0, 0, .42);
  }
  .hy{
    width: 28px;
    font-weight: 400;
    font-size: 12px;
    color:#999;
    text-align: center;
    position: absolute;
    bottom: -20px
  }
  .dui{
    color: #00aeff;
    position: absolute;
    bottom: 1px;
    right: 1px;
  }
  .activeColor{
    border: 1px solid #00aeff!important;
  }
  .set_color{
    position: relative;
    border: 1px solid #ccc;
    border-radius: 3px;
    margin-left: 8px;
    float: left;
    width: 30px;
    height: 30px;
  }
  .title_set{
    line-height: 30px;
    width: 90px;
    text-align: center;
  }
  .range{
    text-align: left;
    font-weight: 600;
    font-size: 16px;
    padding-top: 30px;
    height: 30px;
  }
  .ScrollSet{
    transition: .4s ease-in-out;
    top: -200px!important;
  }
  .Scroll2{
    transition: .4s ease-in-out;
    bottom: -55px!important
  }
  .Scroll{
    transition: .4s ease-in-out;
    top: -44px!important;
  }
  .bottom_item_left{
    position: absolute;
    left: 50%;
    margin-left: -72px;
    width: 145px;
    /*float: right;*/
    margin-right: 25px;
  }
  .go{
    color: #fff;
    margin-top: 6px;
    width: 145px;
    position: absolute;
    /*z-index: 1111;*/
    font-weight: 600;
    font-size: 15px;
    line-height: 34px;
    margin-top: 9px;
    /*width: 100px;*/
    height: 32px;
    /*border: 1px solid #333;*/
    /*border-radius: 16px;*/
    /*float: left;*/
    text-align: center;
  }
  .go2{
    color: #fff;
    background: #00aeff;
    font-weight: 600;
    font-size: 14px;
    line-height: 30px;
    margin-top: 9px;
    width: 100px;
    height: 32px;
    border: 1px solid #00aeff;
    border-radius: 16px;
    float: left;
    text-align: center;
  }
  .bottom_item1{
    top: 5px;
    /*padding-left: 10px;*/
    width: 50px;
    position: absolute;
    left: 50%;
    margin-left: -140px;
    /*float: left;*/
  }
  .bottom_item2{
    top: 5px;
    /*padding-left: 10px;*/
    width: 50px;
    position: absolute;
    left: 50%;
    margin-left: 120px;
    /*float: right;*/
  }
  .back_out{
    position: absolute;
    width: 70px;
    height: 70px;
  }
  .back{
    top: 20px;
    left: 15px;
    position: absolute;
    width: 12px!important;
  }
  .dis_contnet{
    padding-top: 2px;
    padding-bottom: 2px;
    font-size: 14px;
    color: #999;
  }
  .content_passage{
    padding-left: 15px;
    padding-right: 15px;
  }
  .tag_header{
    margin-top:10px;
    margin-bottom: 10px;
  }
  .koala{
    left: 50%;
    margin-left: -60px;
    width: 120px!important;
    position: absolute;
    top:150px;
    animation: fdown 3s ease-in-out infinite;
   }
   @keyframes fdown{
    0%{
      top: 150px;
    }
    50%{
      top: 170px; 
    }
    100%{
      top: 150px;
    }
   }
  .header2 img {
    width: 100%;
  }
  .header2{
    position: relative;
  }
  .bottom{
    position: relative;
    border-radius: 8px 8px 0px 0px;
    transition: .4s ease-in-out;
    /*border-top: 1px solid #f1f1f1;*/
    background: #2797ff;
    width: 100%;
    height: 55px;
    position: fixed;
    bottom: 0;
  }
  .bottom2{
    transition: .4s ease-in-out;
    background: #424242;
    width: 100%;
    height: 44px;
    position: fixed;
    bottom: 0;
    
    /*border-radius: 0px 0px 8px 8px;*/
  }
  .passage{
    margin-top: 30px;
    font-size: 18px;
    line-height: 35px;
  }
  .passage p {
    text-indent: 36px;
    margin-top: 10px;
  }
  .passage img{
    width: 100%;
  }
  .flash{
    left: 14px;
    top:3px;
    position: absolute;
    /*line-height: 20px;*/
    font-size: 24px;
    padding-right: 5px;
  }
  .info{
    margin-top: 20px;
  }
  .tag{
    background-color: #1eb0fc;
    z-index: 100;
    padding-left: 13px;
    position: relative;
    font-weight: 500;
    /*float: right;*/
    font-size: 14px;
    color: #fff;
    text-align: center;
    line-height: 32px;
    height: 34px;
    border-radius: 17px;
    width: 110px;
    /*border: 1px solid #00aeff;*/
  }
  .tag1{
    padding-left: 13px;
    position: relative;
    font-weight: 500;
    /*float: right;*/
    font-size: 14px;
    color: #fdc231;
    text-align: center;
    line-height: 32px;
    height: 34px;
    border-radius: 17px;
    width: 110px;
    border: 1px solid #fdc231;
  }
  .tag2{
    padding-left: 13px;
    position: relative;
    font-weight: 500;
    /*float: right;*/
    font-size: 14px;
    color: #59db9d;
    text-align: center;
    line-height: 32px;
    height: 34px;
    border-radius: 17px;
    width: 110px;
    border: 1px solid #59db9d;
  }
  .info_2{
    float: right;
  }
  .info_1{
    line-height: 22px;
    text-align: left;
    float: left;
    width: 150px;
  }
  .content{
    padding: 0px 20px 20px 20px;
    border-radius: 8px;
    overflow-y: hidden;
    /*overflow-x: hidden;*/
    height: 100%;
    /*margin-top: 42px;*/
    margin: 55px 12px 12px 12px;
    -webkit-box-shadow:0 0 10px rgba(39,151,255, .25);
  -moz-box-shadow:0 0 10px rgba(39,151,255, .25);
  box-shadow:0 0 10px rgba(39,151,255, .25);
  }
  .content img{
    width: 100%;
  }
  .ani{
    transition: .4s ease-in-out;
  }
  .title{
    line-height: 38px;
    font-size: 24px;
    font-weight: 500;
    color: #333;
  }
  .main{
    -webkit-overflow-scrolling : touch;
    background: #e0f0ff;
    height: 100%;
    overflow: hidden;
  }
  .content::-webkit-scrollbar {/*隐藏滚轮*/
    display: none
    }
  .header{
    transition: .4s ease-in-out;
    z-index: 200;
    width: 100%;
    /*background-color: rgba(255, 255, 255, 0.9);*/
    position: fixed;
    top: 0;
    /*border-bottom: 1px solid #f7f7f7;*/
    height: 44px;
  }
  .headerSet{
    -webkit-box-shadow:0 0 10px rgba(39,151,255, .25);
    -moz-box-shadow:0 0 10px rgba(39,151,255, .25);
    box-shadow:0 0 10px rgba(39,151,255, .25);
    border-radius: 8px;
    margin-left: 10px;
    margin-right: 10px;
    padding-left: 20px;
    padding-right: 20px;
    transition: .4s ease-in-out;
    z-index: 120;
    width: 95%;
    background-color: rgba(255, 255, 255, 1);
    position: fixed;
    top: 54px;
    /*border-bottom: 1px solid #f7f7f7;*/
    height: 124px;
  }
  .img_header{
    float: right;
    margin-top: 11px;
    height: 32px;
  }
  .img_header2{
    float: left;
    margin-top: 16px;
    height: 28px;
  }
</style>