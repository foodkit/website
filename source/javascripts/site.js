var submit = function (params) {
  axios.post('http://localhost:8888/api/v4/storefront/foodkit-leads', params)
}

/**
 *
 */
Vue.component('contact-us-step-one', {
  methods: {
    onFormChanged: function () {
      // https://stackoverflow.com/questions/4964691/super-simple-email-validation-with-javascript
      this.$set(this.errors, 'email', !(/(.+)@(.+){2,}\.(.+){2,}/.test(this.email)))
    },
    onFormSubmitted: function () {
      this.onFormChanged()
      if (!this.errors.email) {
        submit({email: this.email})
        this.$emit('next')
      }
    },
    closeModal: function () {
      this.$emit('closeModal')
    }
  },
  data: function () {
    return {
      email: '',
      errors: {}
    }
  },
  template: '\
  <section class="modal fade is-active" id="contact-us-step-one">\
  	<a class="modal-close" href="#!" v-on:click="closeModal">&times;</a>\
  	<div class="modal-content">\
      <div class="modal-body">\
      	<div>\
      		<form method="post">\
          	<div>\
            	<h2 style="text-align: center;">Want to learn more?</h2>\
  						<p style="text-align: center;">No hassle chat with a customer service officer.</p>\
          	</div>\
          	<div class="form-field">\
  		        <div class="form-input-container">\
  		          <input class="form-input" v-model="email" v-on:change="onFormChanged" type="email" placeholder="Business email address" autocomplete="off" required="required" />\
  		        </div>\
              <ul class="validation-messages" v-if="errors.email">\
  			        <li>\
  								<label for="email" role="alert" class="form-inline-message">Valid email address is required</label>\
  							</li>\
  		        </ul>\
      			</div>\
            <div>\
              <input v-on:click="onFormSubmitted" type="submit" class="btn btn-primary btn-lg badge-pill text-uppercase" value="Book Demo">\
            </div>\
          </form>\
        </div>\
        <div class="modal-footer"></div>\
      </div>\
    </div>\
  </section>\
  '
})


/**
 *
 */
Vue.component('contact-us-step-two', {
  props: [
    //'visible'
  ],
  methods: {
    closeModal: function () {
      this.$emit('closeModal')
    },
    onFormSubmitted: function (e) {
      e.preventDefault()
      e.stopPropagation()
      // @todo: submit
      this.$emit('next')
    }
  },
  data: function () {
    return {
      email: '',
      errors: {}
    }
  },
  template: '\
  <section class="modal fade is-active" id="contact-us-step-two">\
  	<a class="modal-close" href="#!" v-on:click="closeModal">&times;</a>\
  	<div class="modal-content">\
      <div class="modal-body">\
      	<div>\
      		<form method="post">\
          	<div>\
            	<h2 style="text-align: center;">Schedule a free product demo now</h2>\
  						<p style="text-align: center;">Fill out the form below and a Foodkit sales representative will contact you. Or you can call us:</p>\
  						<ul class="contact-us row">\
  							<li class="col-md-6">Thailand: +64 98 712 7741</li>\
  							<li class="col-md-6">Singapore: +65 874 6464</li>\
  						</ul>\
          	</div>\
          	<div class="form-field">\
              <div class="row">\
                <div class="form-input-container col-md-6">\
                  <input class="form-input" id="first_name" name="first_name" type="text" placeholder="First name" autocomplete="off">\
                </div>\
                <div class="form-input-container col-md-6">\
    		          <input class="form-input" id="last_name" name="last_name" type="text" placeholder="Last name" autocomplete="off">\
    		        </div>\
              </div>\
  						<div class="form-input-container">\
  		          <input class="form-input" id="phone_number" name="phone_number" type="text" placeholder="Phone number" autocomplete="off">\
  		        </div>\
  						<div class="form-input-container">\
  		          <input class="form-input" id="business_name" name="business_name" type="text" placeholder="Business or company name" autocomplete="off">\
  		        </div>\
      			</div>\
            <div>\
              <input v-on:click="onFormSubmitted" type="submit" class="btn btn-primary btn-lg badge-pill text-uppercase" value="Book Demo">\
            </div>\
          </form>\
        </div>\
      </div>\
      <div class="modal-footer"></div>\
    </div>\
  </div>\
  </section>\
  '
})

/**
 *
 */
var contactUs = new Vue({
  el: '#contact-us',
  data: {
    step: null
  },
  methods: {
    stepOne: function () {
      contactUs.step = 'one'
    },
    stepTwo: function () {
      contactUs.step = 'two'
    },
    hide: function () {
      contactUs.step = null
    }
  },
  template: '\
  <div>\
    <contact-us-step-one v-if="step === \'one\'" v-on:closeModal="hide" v-on:next="stepTwo" />\
    <transition name="fade">\
      <contact-us-step-two v-if="step === \'two\'" v-on:closeModal="hide" v-on:next="hide" />\
    </transition>\
  </div>\
  '
})

/**
 *
 */
var elements = document.getElementsByClassName('btn-cta')
for (var i=0 ; i<elements.length ; i++) {
  elements[i].onclick = function () {
    contactUs.stepOne()
    return false
  }
}