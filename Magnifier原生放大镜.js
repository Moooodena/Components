// 1.获取三个盒子
const small = document.querySelector('.small')
const middle = document.querySelector('.middle')
const large = document.querySelector('.large')

// 事件委托  给img的公共父元素，绑定mouseover事件
small.addEventListener('mouseover', function (e) {
  if (e.target.tagName === 'IMG') {
    small.querySelector('.active').classList.remove('active') // 有一个默认选中的的商品，所以可以通过类名选中，想想如果都没有类名应该怎么做？
    e.target.classList.add('active')

    // 拿到当前小图片的src
    console.log(e.target.src)
    // 让中等盒子里面的图片src 更换为 小图片 src
    middle.querySelector('img').src = e.target.src
    // 大盒子的背景图也为小盒子的图
    large.style.backgroundImage = `url(${e.target.src})`
  }
})

// 3. 鼠标经过中等盒子，显示隐藏的大盒子
const showBigBox = function () {
  large.style.display = 'block'
}
const hideBigBox = function () {
  large.style.display = 'none'
}
middle.addEventListener('mouseenter', showBigBox)
middle.addEventListener('mouseleave', hideBigBox)

// 4.鼠标经过中等盒子，显示黑色的遮罩层
const layer = document.querySelector('.layer')
middle.addEventListener('mouseenter', function () {
  layer.style.display = 'block'
})
middle.addEventListener('mouseleave', function () {
  layer.style.display = 'none'
})

// 5.让黑色遮罩层盒子跟随鼠标移动
// 我们没有办法直接求到鼠标在中等盒子里面的坐标
// 1.先求鼠标在页面中的坐标 e.pageX / e.pageY
// 2.再求盒子在页面中的坐标（位置） ，注意，这个是固定不变的
// console.log(middle.offsetTop)  // 不用它是因为 它是相对于定位父元素的位置
// console.log(middle.offsetLeft)
// console.log(middle.getBoundingClientRect().top)
// console.log(middle.getBoundingClientRect().left)
middle.addEventListener('mousemove', function (e) {
  // window.pageYOffset / document.documentElement.scrollTop
  // 鼠标在中等盒子内的坐标 = 鼠标在页面中的坐标 - middle盒子在页面中的坐标(距离) - 页面滚动的距离
  let x = e.pageX - middle.getBoundingClientRect().left - window.pageXOffset
  let y = e.pageY - middle.getBoundingClientRect().top - window.pageYOffset
  console.log(x, y)
  if (x >= 0 && x <= 400 && y >= 0 && y <= 400) {
    // 声明两个变量  表示黑色盒子移动的坐标
    let mx = 0,
      my = 0
    if (x <= 100) mx = 0
    if (x > 100 && x < 300) mx = x - 100
    if (x >= 300) mx = 200

    if (y <= 100) my = 0
    if (y > 100 && y < 300) my = y - 100
    if (y >= 300) my = 200

    layer.style.left = mx + 'px'
    layer.style.top = my + 'px'

    // 大盒子的背景图要跟随 黑色遮罩层的位置 变化 ，有个两倍的关系
    // 比如：鼠标滚轮往上滚动，页面向下
    // 鼠标往右走，背景图应该往左走，所以这里要加负号
    large.style.backgroundPositionX = -2 * mx + 'px'
    large.style.backgroundPositionY = -2 * my + 'px'
  }
})
