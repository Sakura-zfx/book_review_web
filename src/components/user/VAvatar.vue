<template>
  <div :class="boxClass" :style="avatarStyle">
    <div class="no-avatar" :style="noAvatarStyle" v-if="noAvatar">{{name | limit}}</div>
    <img class="avatar" :src="avatarUrl" @error="handleAvatarError" v-if="!noAvatar && avatarUrl" />
  </div>
</template>

<script>
  export default {
    name: 'v-avatar',
    data() {
      return {
        noAvatar: false,
        AVATAR_COLORS: ['#2dc888', '#488ff9', '#ffa400', '#fb7171']
      }
    },

    props: {
      userId: {
        type: [Number, String]
      },
      name: {
        type: String,
        default: ''
      },
      size: {
        type: String,
        default: 'normal'
      },
      shape: {
        type: String,
        default: 'default'
      },
      avatarStyle: {
        type: Object
      },
      fontSize: {
        type: [String, Number],
        default: 14
      },
    },

    computed: {
      boxClass() {
        return ['avatar-box',
          `avatar-box--${this.size}`,
          `avatar-box-shape--${this.shape}`,
          `fz${this.fontSize}`
        ]
      },
      avatarUrl() {
        return ''
      },
      noAvatarStyle() {
        return {
          backgroundColor: this.AVATAR_COLORS[this.userId % 4]
        }
      },
    },

    filters: {
      limit(value) {
        if (!value) return ''
        if (value.length > 2) {
          value = value.substr(-2)
        }
        return value
      }
    },

    methods: {
      handleAvatarError() {
        this.noAvatar = true
      },
    },
  }

</script>

<style lang="scss" scoped>
  @import "../../assets/scss/common";
  %cover {
    width: 100%;
    height: 100%;
  }

  .avatar-box {
    overflow: hidden;
    &--normal {
      @include boxCenter(40)
    }
    &--small {
      @include boxCenter(30)
    }
    &-shape--default {
      border-radius: px2Vw(4)
    }
    .no-avatar {
      border-radius: px2Vw(4);
      color: $c_white;
      @extend %cover;
    }
    .avatar {
      @extend %cover;
      -webkit-border-radius: px2Vw(4);
      border-radius: px2Vw(4);
    }
  }

</style>
