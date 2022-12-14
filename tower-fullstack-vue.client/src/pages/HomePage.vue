<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12 bg-image my-3 elevation-2">
        <section class="row">
          <div class="col-lg-4 col-12 text-light box-shadow-1 ms-2 ms-md-5">
            <h4 class="mt-5">Get ahead of the scalpers.
            </h4>
            <h4>Reserve your seat now with
            </h4>
            <h4>real events for real people.
            </h4>
          </div>
        </section>
      </div>
      <div class="col-md-6 col-12 d-flex bg-dark justify-content-between p-md-0 px-4 elevation-3">
        <button class="btn btn-outline-light my-2 me-1 ms-2 stnd-w">All</button>
        <button class="btn btn-outline-light my-2 mx-1 stnd-w">Concerts</button>
        <button class="btn btn-outline-light my-2 mx-1 stnd-w">Conventions</button>
        <button class="btn btn-outline-light my-2 mx-1 stnd-w">Digital</button>
      </div>
      <div class="col-md-6 col-12 d-flex bg-dark justify-content-between p-md-0 px-4 elevation-3">

        <button class="btn btn-outline-light my-2 mx-1 stnd-w">Exhibits</button>
        <button class="btn btn-outline-light my-2 mx-1 stnd-w">Expos</button>
        <button class="btn btn-outline-light my-2 mx-1 stnd-w">Sports</button>
        <button class="btn btn-outline-light my-2 ms-1 me-2 stnd-w">Other</button>
      </div>

      <div class="col-12">
        <section class="row">
          <div class="col-3">

          </div>
        </section>
      </div>
    </section>
  </div>

</template>

<script>
export default {
  setup() {
    return {}
  }
}
</script>

<style scoped lang="scss">
.bg-image {
  background-image: url('https://images.unsplash.com/photo-1557787163-1635e2efb160?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80');
  background-position: center;
  background-size: cover;
  min-height: 35vh;
  max-width: 90vw;
  border: 1px solid rgb(0, 200, 255);
}

@media (max-width: 992px) {
  .bg-image {
    background-image: url('https://images.unsplash.com/photo-1557787163-1635e2efb160?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80');
    background-position: center;
    background-size: cover;
    min-height: 35vh;
    max-width: 120vw;
    border: 1px solid rgb(0, 200, 255);
  }

}

.box-shadow-1 {
  text-shadow: 2px 2px rgb(10, 10, 10);
}

.stnd-w {
  width: 18vh;
}
</style>
