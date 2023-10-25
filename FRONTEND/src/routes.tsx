import { Icon } from '@chakra-ui/react'
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart
} from 'react-icons/md'

// Admin Imports


// Auth Imports
import { IRoute } from 'types/navigation'
import { RiHistoryLine } from 'react-icons/ri'

const routes: IRoute[] = [
  {
    name: 'Dashboard',
    layout: '/',
    path: 'home',
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: "MainDashboard"
  },
  {
    name: 'Models',
    layout: '/',
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: 'model',
    component: "DataTables"
  },
  {
    name: 'History',
    layout: '/',
    path: 'history',
    icon: <Icon as={RiHistoryLine} width='20px' height='20px' color='inherit' />,
    component: "Profile"
  },
]

export default routes
