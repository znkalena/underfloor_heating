//swiper
new Swiper('.hero__slider',{
    slidesPerView: 2,
    spceBetween:10,
    loop:true,
    navigation:{
        prevEl:'.hero__slider_btn_prev',
        nextEl:'.hero__slider_btn_next',
    },
    autoplay:{
        delay:3000,
    },
    breakpoints:{
        560:{
            spceBetween:8,
        },
        320:{
            slidesPerView:1,
        }
    },
    },
);

//calculator
const calcForm = document.querySelector('.js-calc-form');
const totalSguare = document.querySelector('.js-square');
const totalPrice = document.querySelector('.js-total-price');
const calcResult =document.querySelector('.calc__result-wrapper');
const btnSubmit = calcForm.querySelector('.js-submit');
const calcOrder =document.querySelector('.calc__order')

const tariff={
    economy:550,
    comfort:1400,    
    premium:2700,
}

calcForm.addEventListener('input',() =>{
        if(calcForm.width.value > 0 && calcForm.lenght.value > 0){
        btnSubmit.disabled = false;
        }else{
        btnSubmit.disabled = true;  
        }           
});

calcForm.addEventListener('submit',(evt) =>{
evt.preventDefault();

if(calcForm.width.value > 0 && calcForm.lenght.value > 0){    
    calcResult.style.display = 'block';
    calcOrder.style.display = 'inline-block' ;   
    const square = calcForm.width.value *calcForm.lenght.value ;    
    totalSguare.textContent = `${square} кв м`;
    const price= square * tariff[calcForm.tariff.value]; 
    totalPrice.textContent = `${price} руб`; 

}});
//modal

const orderBtn = document.querySelectorAll('.js__button');
const modal =document.querySelector('.modal');
const closeBtn = modal.querySelector('.modal__close');

const openModal = () =>{
    modal.classList.remove('modal-close');
    modal.classList.add('modal-open');
};

const closeModal = () => {
    modal.classList.remove('modal-close');
    modal.classList.remove('modal-open');
}

orderBtn.forEach((btn) =>{
    btn.addEventListener('click',() => {
        openModal();
        
        closeBtn.addEventListener('click', () => {
            closeModal();
        });
        document.addEventListener('keydown',(evt) => {    
            if(evt.key === 'Esc' || evt.key ==='Escape'){
                closeModal();
            }
        });
        });
});

//mask
const phone = document.querySelector('#phone');
const imPhone = new Inputmask("+7(999)999-99-99");
imPhone.mask(phone);

//validation
const validator = new JustValidate('.modal__form',{
    errorLabelCssClass:'modal__input-error',
    errorLabelStyle: {
        color: '#ffC700',
        },
});
validator
.addField('#name',[
    {
        rule: 'minLength',
        value: 3,
        errorMessage:'more than 3'
    },
    {
        rule: 'maxLength',
        value: 30,
        errorMessage:'less then 30'
    },
    {
        rule: 'required',
        errorMessage:'what is your name?'
    }
    ]);

validator
.addField('#phone',[
    {
        rule: 'required',
        errorMessage:'what is your phone?'
    },
    
]);
validator.onSuccess((evt) => {
const form = evt.currentTarget;
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({
    name:form.name.value,
    imPhone:form.phone.value
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((data) => {
    form.reset();
    alert(`thank you for your order number: ${data.id},we will call back you`)
  });
});
