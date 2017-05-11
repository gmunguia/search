~function () {

//////////////////////////// SEARCH BAR STYLE /////////////////////////

$('.searchbar--sticky').sticky({
  topSpacing: 100,
  getWidthFrom: '.searchbar--sticky',
})

const scrollTop = ko.observable(0)
const isTyping = ko.observable(false)

// Update observables as they change.
$(window).scroll(() => { scrollTop($(window).scrollTop()) })
$('.searchbar__input').blur(() => { isTyping($('.searchbar__input').is(':focus')) })

const searchBarOpacity = ko.pureComputed(() => {
  const _scrollTop = scrollTop(),
    _searchText = searchText(),
    _isTyping = isTyping()

  return _searchText || _isTyping ? 1 : Math.min(_scrollTop / 200, 1)
})

//////////////////////////// HIGHLIGHT SEARCH /////////////////////////

const highlight = text => {
  if (text.length < 2) return

  new HR('li.metasyntactic__item', {
    highlight: [searchText()],
    backgroundColor: '#B4FFEB',
  }).hr()
}

// Undoes de effects of HR. Details obtained from the library's source code.
const unhighlight = () => {
  const metasyntactic = document.querySelectorAll('.metasyntactic__item')

  Array.prototype.slice.call(metasyntactic).forEach(item => {
    item.innerHTML = item.innerHTML
      .replace(new RegExp(/<span data-hr[^>]*>([^<]*)<\/span>/g), '$1')
  })
}

const searchText = ko.observable('')
searchText.subscribe(unhighlight)
searchText.subscribe(highlight)

//////////////////////////// GENERATE CONTENT /////////////////////////

function generateMetasyntacticText () {
  var words = 'eum et optio porro consequatur quia ullam nulla ipsa voluptatem ullam qui consectetur nobis corporis eius numquam sunt consequatur et iusto consequuntur consectetur quasi nisi blanditiis et minima eos qui quisquam iure quia excepturi dignissimos explicabo'.split(' ')

  return 'Lorem ipsum ' + repeat(30, pickOne(words)).join(' ') + '.'
}

// [a] -> a
function pickOne (array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

function repeat (n, a) {
  return Array.apply(undefined, Array(n)).map(() => a)
}

const items = repeat(25).map(() => ({ text: generateMetasyntacticText() }))
const filteredItems = ko.pureComputed(function () {
  const result = items
    .filter(item => item.text.indexOf(searchText()) !== -1)
  console.log(result)
  return result
})

//////////////////////////// BIND TEMPLATE /////////////////////////

ko.applyBindings({
  filteredItems,
  searchText,
  searchBarOpacity,
})

}()
