import App from './components/app'
import Serp from './components/serp'
import Logo from './components/logo'
import Ticket from './components/ticket'
import Filters from './components/filters'
import SortingTabs from './components/sorting-tabs'
import generateBemClass from './commons/generate-bem-class'


export default {
  App,
  Serp,
  Logo,
  Ticket,
  Filters,
  SortingTabs,
  class: generateBemClass,
}
