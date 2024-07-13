<template>
  <suncaper-layout
    theme="dark"
    :logo="logo"
    :sidebar-list="sidebarList"
    :logout="logout"
  />
</template>

<script>
import {mapGetters} from 'vuex'
import Layout from '@/layouts/Layout'
import logo from '@/assets/images/logo.png'

export default {
  name: 'Main',
  data () {
    return {
      logo: {
        src: logo,
        alt: '住宿系统',
        firstDes: '住宿系统',
        secondDes: '校园智慧宿舍软件'
      }
    }
  },
  computed: {
    ...mapGetters({
      userType: 'user/getUserType',
      getSidebarList: 'sidebar/getSidebarList'
    }),
    sidebarList () {
      return this.getSidebarList(this.userType).main
    }
  },
  methods: {
    logout () {
      this.$router.push('/login')
      this.$store.commit('user/SET_USER_ID', null)
      this.$store.commit('user/SET_USER_NAME', null)
      this.$store.commit('user/SET_USER_TYPE', null)
    }
  },
  components: {
    'suncaper-layout': Layout
  }
}
</script>
