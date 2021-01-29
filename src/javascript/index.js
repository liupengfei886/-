// 全局变量
const data = {
  innerWidth: window.innerWidth, // 浏览器可视窗口的宽度
  innerHeight: window.innerHeight, // 浏览器可用高度
  clientHeight: document.body.clientHeight || document.documentElement.clientHeight, // 浏览器可视窗口的高度
  timer: null,
  activeMenu: 'home'
}

window.onload = init
// 页面初始化逻辑
function init() {
  ifNeededRemind()
  setCaptionAnimate(0)
}

window.onresize = function() {
  const notRemindAgain = JSON.parse(sessionStorage.getItem('notRemindAgain'))
  if (!notRemindAgain) {
    detectZoom()			
  }
}

window.onscroll = function() {
  const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
  setBackToTopStatus(scrollTop)
  setCaptionAnimate(scrollTop)
  setWisdomAnimate(scrollTop)
  setSolutionAnimate(scrollTop)
  setServiceAnimate(scrollTop)
  switchActiveMenu(scrollTop)
}
/**
 * 控制节点动画添加与删除的时机
 * @param {Object} node 被操作节点
 * @param {Number} scrollTop 滚动条距离顶部的距离
 * @param {String} animateName 动画名称
 * @param {Number} disFromTop 元素距离浏览器可视窗口顶部的高度
 */
function setAnimate(node, scrollTop, animateName, disFromTop) {
  if (!node) {
    return false
  }
  
  if (disFromTop >= 0) {
    if (disFromTop <= data.innerHeight) {
      node.classList.add(animateName)
      node.style.visibility = 'visible'
    } else {
      node.classList.remove(animateName)
      node.style.visibility = 'hidden'
    }				
  } else {
    node.classList.remove(animateName)
    node.style.visibility = 'hidden'
  }
}

function setCaptionAnimate(scrollTop) {
  const tagline = document.querySelector('.tagline')
  const provider = document.querySelector('.provider')
  
  setAnimate(tagline, scrollTop, 'fadeInDown', tagline.getBoundingClientRect().top)
  setAnimate(provider, scrollTop, 'fadeInUp', provider.getBoundingClientRect().top)
}

function setWisdomAnimate(scrollTop) {
  const wisdomPark = document.querySelector('#wisdom-park')
  const titleNode = wisdomPark.querySelector('.module-title')
  const subtitleNode = wisdomPark.querySelector('.module-subtitle')
  const introduceNode = wisdomPark.querySelector('.module-introduce')
  
  setAnimate(titleNode, scrollTop, 'slideInRight', titleNode.getBoundingClientRect().top)
  setAnimate(subtitleNode, scrollTop, 'slideInLeft', subtitleNode.getBoundingClientRect().top)
  setAnimate(introduceNode, scrollTop, 'slideInLeft', introduceNode.getBoundingClientRect().top)
}

function setSolutionAnimate(scrollTop) {
  const solution = document.querySelector('#solution')
  const titleNode = solution.querySelector('.module-title')
  const introduceNode = solution.querySelector('.module-introduce')
  
  setAnimate(titleNode, scrollTop, 'slideInRight', titleNode.getBoundingClientRect().top)
  setAnimate(introduceNode, scrollTop, 'slideInLeft', introduceNode.getBoundingClientRect().top)
}

function setServiceAnimate(scrollTop) {
  const service = document.querySelector('#service-process')
  const titleNode = service.querySelector('.module-title')
  const introduceNode = service.querySelector('.module-introduce')
  
  setAnimate(titleNode, scrollTop, 'slideInRight', titleNode.getBoundingClientRect().top)
  setAnimate(introduceNode, scrollTop, 'slideInLeft', introduceNode.getBoundingClientRect().top)
}

function setBackToTopStatus(scrollTop) {
  const backToTopNode = document.querySelector('.backToTop')
  if (scrollTop >= data.clientHeight * 0.4) {
    backToTopNode.style.display = 'block'
  } else {
    backToTopNode.style.display = 'none'
  }
}

/**
 * 设置检测浏览器缩放提示框显示隐藏状态
 * @param {Sting} type 显示隐藏状态
 */
function setMonitoringStatus(type) {
  const scalingMonitoring = document.querySelector('.scaling-monitoring')
  scalingMonitoring.style.display = type
}

// 是否需要提醒用户页面缩放不正常
function ifNeededRemind() {
  const notRemindAgain = JSON.parse(sessionStorage.getItem('notRemindAgain'))
  if (!notRemindAgain) {
    detectZoom()			
  }
}

// 检测浏览器的缩放是否为正常的100%
function detectZoom() {
  let ratio = 0
  let screen = window.screen
  let ua = navigator.userAgent.toLowerCase()
  if (window.devicePixelRatio !== undefined) {
    ratio = window.devicePixelRatio
  } else if (ua.indexOf('msie') !== -1) {
    if (screen.deviceXDPI && screen.logicalXDPI) {
      ratio = screen.deviceXDPI / screen.logicalXDPI
    }
  } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
    ratio = window.outerWidth / window.innerWidth
  }
  if (ratio) {
    ratio = Math.round(ratio * 100)
  }
  if (ratio !== 100) {
    setMonitoringStatus('block')
  } else {
    setMonitoringStatus('none')
  }
}

window.closeMonitoring = function() {
  setMonitoringStatus('none')
}

// 设置监控页面缩放是否需要提示
window.setNotRemind = function() {
  sessionStorage.setItem('notRemindAgain', true)
  closeMonitoring()
}

function switchActiveMenu(scrollTop) {
  const wisdomPark = document.querySelector('#wisdom-park')
  const solution = document.querySelector('#solution')
  const service = document.querySelector('#service-process')
  const bannerLinks = Array.from(document.querySelectorAll('.bannerLink'))
  if (data.activeMenu !== 'aboutUs') {
    if (scrollTop >= 0 && scrollTop < wisdomPark.offsetTop) {
      setActiveMenu(bannerLinks[0])
    } else if (scrollTop >= wisdomPark.offsetTop && scrollTop < solution.offsetTop) {
      setActiveMenu(bannerLinks[1])
    } else if (scrollTop >= solution.offsetTop) {
      setActiveMenu(bannerLinks[2])
    }
  } else {
    setActiveMenu(bannerLinks[3])
  }
}

// 顶部导航栏添加点击切换字体颜色
function setActiveMenu(node) {
  const bannerLinks = document.querySelectorAll('.bannerLink')
  for (let i = 0; i < bannerLinks.length; i++) {
    const item = bannerLinks[i]
    item.style.color = '#FFFFFF'
  }
  node.style.color = '#00F6FF'
}

/**
 * 为滚动条添加动画过渡效果
 * @param {Number} number 滚动条距离顶部的位置
 * @param {Number} time 动画效果过渡的总时长
 */
window.ScrollTop = function (number = 0, time) {
  if (!time) {
    document.body.scrollTop = document.documentElement.scrollTop = number
    return number
  }
  const spacingTime = 20 // 设置循环的间隔时间  值越小消耗性能越高
  let spacingInex = time / spacingTime // 计算循环的次数
  let nowTop = document.body.scrollTop + document.documentElement.scrollTop // 获取当前滚动条位置
  let everTop = (number - nowTop) / spacingInex // 计算每次滑动的距离

  cancelAnimationFrame(data.timer);
  data.timer = requestAnimationFrame(function fn(){
    if (spacingInex > 0) {
      spacingInex--
      ScrollTop(nowTop += everTop)
      data.timer = requestAnimationFrame(fn)
    } else {
      cancelAnimationFrame(data.timer)
    }
  })
}

function smoothScroll(node) {
  // 获取标签自定义属性
  const _node = node?.attributes['goto']?.nodeValue
  if (_node) {
    const scrollTop = document.querySelector(`.${_node}`).offsetTop
    ScrollTop(scrollTop - 90, 500)						
  }
}

function switchComponent(node) {
  const _node = node?.attributes['component']?.nodeValue
  const mainComponent = document.querySelector('.main-component')
  const aboutUsComponent = document.querySelector('.aboutUs-component')
  const top = document.querySelector('.container .top')
  const dpi = data.innerWidth > 1440 ? 1920 : 1440
  const showingPicture = _node === 'aboutUs' ? 'aboutUsBackImg' : 'homeBackImg'
  const hiddenedPicture = _node === 'aboutUs' ? 'homeBackImg' : 'aboutUsBackImg'
  // 切换背景图(通过提前加载图片的方式解决直接切换背景图时，页面闪屏的问题)
  const image = new Image()
  image.src = require(`../images/${showingPicture}${dpi}.png`).default
  image.onload = function (e) {
    if(top.classList.contains(`${hiddenedPicture}${dpi}`)) {
      top.classList.replace(`${hiddenedPicture}${dpi}`, `${showingPicture}${dpi}`)
    } else {
      top.classList.add(`${showingPicture}${dpi}`)
    }
  }
  if (_node && _node === 'aboutUs') {
    mainComponent.style.display = 'none'
    aboutUsComponent.style.display = 'block'					
  } else {
    mainComponent.style.display = 'block'
    aboutUsComponent.style.display = 'none'			
  }
}

function bindClickEventForLink() {
  const bannerLinks = document.querySelectorAll('.bannerLink')
  for (let i = 0; i < bannerLinks.length; i++) {
    const ele = bannerLinks[i]
    ele.onclick = (e) => {
      data.activeMenu = e.target?.attributes['component']?.nodeValue
      setActiveMenu(e.target)
      switchComponent(e.target)
      smoothScroll(e.target)
    }
  }
}
bindClickEventForLink()

// 对我司工作岗位的介绍
function setActivePosition() {
  const positionName = Array.from(document.querySelectorAll('.position .position-name'))
  for (let i = 0; i < positionName.length; i++) {
    const node = positionName[i]
    node.addEventListener('mouseover', function(e) {
      for (let j = 0; j < positionName.length; j++) {
        const item = positionName[j]
        if (item.classList.contains('on')) {
          item.classList.remove('on')
        }
      }
      e.target.classList.add('on')
      const nameAttr = e.target?.attributes['tag']?.nodeValue
      
      const positionDesc = Array.from(document.querySelectorAll('.position-intro .position-desc'))
      for (let z = 0; z < positionDesc.length; z++) {
        const descAttr = positionDesc[z]?.attributes['tag']?.nodeValue
        if (nameAttr === descAttr) {
          positionDesc[z].style.display = 'block'
        } else {
          positionDesc[z].style.display = 'none'
        }
      }
    })
  }
}
setActivePosition()