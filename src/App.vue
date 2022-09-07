<template>
  <!-- ❓ 레이아웃 css를 위해 적용한 컨테이너 입니다. 컨테이너로 묶지 않고, #app 엘리먼트에 css를 적용하는게 더 좋은 방식일까요? -->
  <div id="container">
    <AppHeader id="header" title="Priority Tasks" />
    <RouterView id="main" />
    <AppFooter id="footer" />
  </div>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router';
</script>

❓ Base 스타일 적용을 위해 루트 컴포넌트의 style 태그의 scope 속성을 제거하였습니다. 이렇게 하면
모든 컴포넌트에 스타일이 적용되는데, 이렇게 하면 안되는 이유가 있을까요? ❓ base.scss 파일을 별도로
분리해서 사용하는 방식이 더 적합한가요?
<style lang="scss">
  html * {
    margin: 0;
    padding: 0;
    font-family: 'Courier New', Courier, monospace;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: #967e76;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%23404' stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%23505'%3E%3Ccircle cx='769' cy='229' r='5'/%3E%3Ccircle cx='539' cy='269' r='5'/%3E%3Ccircle cx='603' cy='493' r='5'/%3E%3Ccircle cx='731' cy='737' r='5'/%3E%3Ccircle cx='520' cy='660' r='5'/%3E%3Ccircle cx='309' cy='538' r='5'/%3E%3Ccircle cx='295' cy='764' r='5'/%3E%3Ccircle cx='40' cy='599' r='5'/%3E%3Ccircle cx='102' cy='382' r='5'/%3E%3Ccircle cx='127' cy='80' r='5'/%3E%3Ccircle cx='370' cy='105' r='5'/%3E%3Ccircle cx='578' cy='42' r='5'/%3E%3Ccircle cx='237' cy='261' r='5'/%3E%3Ccircle cx='390' cy='382' r='5'/%3E%3C/g%3E%3C/svg%3E");
  }

  #container {
    margin: 5vh auto;
    width: 720px;
    display: flex;
    flex-direction: column;
    min-height: 90vh;
    background-color: #eee3cb;
    box-shadow: 0px 0px 20px 5px #d7c0ae;
  }

  #header {
    flex-shrink: 0;
    background-color: #d7c0ae;
  }

  #main {
    flex: 1 0 auto;
  }

  #footer {
    flex-shrink: 0;
    background-color: #d7c0ae;
  }
</style>
