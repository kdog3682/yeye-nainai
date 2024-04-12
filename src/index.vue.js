name: v-lines

function render(h) {
    const value = this.value
    console.log(value)
    const opts = {
        bold: this.bold,
        centered: this.centered,
        italic: this.italic,
        color: this.color,
    }
    const runner = (value) => {
        return h('v-text', {props: { value, ...opts }})
    }
    if (isArray(value)) {
        return h('div', {}, value.map(runner))
    } else {
        return runner(value)
    }
}
------------------------------------------------------------

name: v-text

async created() {

    googleFontLoader(this.fontFamily)
    // const a = await googleFontLoader(this.fontFamily)
    // console.log(a)
}

computed fontFamily() {
    if (this.font) {
    return maybe(capitalize(this.font), variables.googleFontAliases)
    }
}
render(h) {
    const opts = {
        style: {
            fontWeight: this.bold ? 'bold' : null,
            color: this.color ? this.color : null,
            fontStyle: this.italic ? 'italic' : null,
            fontStyle: this.italic ? 'italic' : null,
            fontSize: this.size ? addUnit(this.size, "pt") : null,
            fontFamily: this.font ? this.fontFamily : null,
            textAlign: this.centered ? 'center' : null,
        },
        attrs: {
            name: 'text'
        }
    }
    return h('p', opts, this.value)
}

------------------------------------------------------------

name: v-chi-eng

flex layout = vertical spacing = 10
    c: fs30 fcwhite bold pt30 pr20 pb30
    children: tar

    div for = line in value
        p {line.chinese}
            c: bold
        p {line.english}
// v-lines :value = chinese
// v-lines :value = english

------------------------------------------------------------

name: v-portrait-card

flex layout = vertically-centered spacing = 10

    container
        width: 100%
        children: tac

        h1 {name.chinese}
            c: fs30
        h2 {name.pinyin}
        h3 {label}

    v-img width = 200pt height = 150pt :src = src centered = true round = true

------------------------------------------------------------
name: home

container name = root
    container name = inner-body
        c: p100 pb50
        grid template = ab|c rgap = 100
            v-portrait-card bind = pictures.yeye
            v-portrait-card bind = pictures.nainai

            v-img src = sunset width = 100% round = true background = true
                height = fit-content
                v-chi-eng :value = phrasings.newJourneyBegins
        

        div
            c: center py50vh
            v-text centered = true size = 50 font = tangerine
                value = Rest in peace in the kingdom of heaven.

        v-img src = sunset round = 100%

        spacer(50)

        grid columns = 2

            button for = action, index in actions {action.label}
                c: fcwhite center fs30 p50 bold

                mouseover() {
                    console.log('mousing')
                }
                click(action) {
                    this.$alert(action)
                }
                // style(index) {
                    // const background = variables.roygbiv[index]
                    // return { background, }
                // }
data: 
    actions:
        label: Family Tree

        label: Writings

        label: Memories

        label: Pictures
    writings:
        abc: 1
    phrasings:
        newJourneyBegins:
            chinese: 在地上相遇，
            english: Together on earth，

            chinese: 返回天堂，
            english: And then we departed，

            chinese: 从新开始旅程。
            english: But now the journey begins again。
    pictures:
        yeye:
            name:
                pinyin: Li Tang Xun
                chinese: 李唐勛
            label:  爷爷
            src: sunset
        nainai:
            name:
                pinyin: Chong Qin
                chinese: ChongQin
            label: 奶奶
            src: sunset
function mounted() {
    console.log(this.$data)
}
