~function () {

//////////////////////////// SEARCH BAR STYLE /////////////////////////

  $('.searchbar--sticky').sticky({
    topSpacing: 100,
    getWidthFrom: '.searchbar--sticky',
  })

  const searchBarOpacity = ko.observable(0)

  $(window).scroll(() => {
    searchBarOpacity(Math.min($(window).scrollTop() / 200, 1))
  })

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

//////////////////////////// HIGHLIGHT SEARCH /////////////////////////

  const highlight = text => {
    if (text.length < 2) return

    new HR('.metasyntactic', {
      highlight: [searchText()],
      backgroundColor: '#B4FFEB',
    }).hr()
  }

  // Undoes de effects of HR. Details obtained from the library's source code.
  const unhighlight = () => {
    const metasyntactic = document.querySelector('.metasyntactic')

    metasyntactic.innerHTML = metasyntactic.innerHTML
      .replace(new RegExp(/<span data-hr[^>]*>([^<]*)<\/span>/g), '$1')
  }

  const searchText = ko.observable('')
  searchText.subscribe(unhighlight)
  searchText.subscribe(highlight)

//////////////////////////// BIND TEMPLATE /////////////////////////

  ko.applyBindings({
    generateMetasyntacticText,
    repeat,
    searchText,
    searchBarOpacity,
  })
}()
