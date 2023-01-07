// import { Masonry } from "masonry-layout"

const yt = document.querySelector("#btn-yt")
const st = document.querySelector("#btn-st")
const gs = document.querySelector("#btn-gs")
const gh = document.querySelector("#btn-gh")
const cnt_yt = document.querySelector("#component-yt")
const cnt_st = document.querySelector("#component-st")
const cnt_gs = document.querySelector("#component-gs")
const cnt_gh = document.querySelector("#component-gh")

const buttons = [yt, st, gs, gh]
const content = [cnt_yt, cnt_st, cnt_gs, cnt_gh]

buttons.forEach(button => {
    button.addEventListener('click', e => {
        for (let i = 0; i < 4; i++) {
            content[i].classList.remove('active')
            content[i].classList.add('inactive')
        }

        const idx = buttons.indexOf(e.target)
        content[idx].classList.add('active')
        content[idx].classList.remove('inactive')
    })
})


// gh.addEventListener('click', () => {
//     const grid = document.querySelector(".inner-window-gh")
//     const masonry = new Masonry(grid)
//     console.log(grid)
// })

// var colcade = new colcade('.grid', {
//     // columns: '.grid-col',
//     items: '.grid-item'
// });