// Массив с данными для карусели домов на продажу
const arrayHouses = [
    {
        "id": "romanovskaya-14",
        "alt": "Дом улица Романовская 14",
        "cost": "3,8",
        "houseArea": "90",
        "landArea": "4 сотки",
        "address": "Ейское шоссе,<br> КП Ясенево,<br> ул. Романовская, 14",
    }, {
        "id": "romanovskaya-10",
        "alt": "Дом улица Романовская 10",
        "cost": "4",
        "houseArea": "100",
        "landArea": "4,3 сотки",
        "address": "Ейское шоссе,<br> КП Ясенево,<br> ул. Романовская, 10",
    }, {
        "id": "raduzhnaya-16",
        "alt": "Дом улица Радужная 16",
        "cost": "4,1",
        "houseArea": "102 м<sup>2</sup> + терраса: 12",
        "landArea": "4,3 сотки",
        "address": "Ейское шоссе,<br> КП Ясенево,<br> ул. Радужная, 16",
    }, {
        "id": "romanovskaya-08",
        "alt": "Дом улица Романовская 8",
        "cost": "4,5",
        "houseArea": "123",
        "landArea": "4,3 сотки",
        "address": "Ейское шоссе,<br> КП Ясенево,<br> ул. Романовская, 8",
    }, {
        "id": "romanovskaya-04",
        "alt": "Дом улица Романовская 4",
        "cost": "4,9",
        "houseArea": "2 этажа / 121",
        "landArea": "5 соток",
        "address": "Ейское шоссе,<br> КП Ясенево,<br> ул. Романовская, 04",
    }, {
        "id": "house-110m",
        "alt": "Дом 110 квадратных метров",
        "cost": "4,3",
        "houseArea": "110",
        "landArea": "4,3 сотки",
        "address": "Ейское шоссе,<br> КП Ясенево,<br> ул. Романовская",
    }, {
        "id": "house-157m",
        "alt": "Дом 157 квадратных метров",
        "cost": "5,6",
        "houseArea": "157",
        "landArea": "4,3 сотки",
        "address": "Ейское шоссе,<br> КП Ясенево,<br> ул. Романовская",
    },
];
let houseArr = []; // массив без повторяющегося дома.
const idPage = document.querySelector("body"); // поиск айдишников для работы

if (idPage.id === 'catalog') { // поиск для работы на странице Дома в продаже catalog.php
    generateCard(arrayHouses);
} else if (idPage.id === 'reviews' || idPage.id === 'onorder' || idPage.id === 'about') { // поиск для работы на странице Отзывы reviews.php или Дома на заказ order.php или о компании company.php
    generatingSlidesWithAllHouses(arrayHouses);
} else if (idPage.id === 'individual') { // поиск для работы на странице персональных домов /houses/
    generatingSlidesWithoutHouse(arrayHouses);
}

// случайный порядок записей на основе функции https://habr.com/ru/post/358094/
//вспомогательная функция 
function putToCache(elem, cache) {
    if (cache.indexOf(elem) != -1) {
        return;
    }
    var i = Math.floor(Math.random() * (cache.length + 1));
    cache.splice(i, 0, elem);
}
//функция, возвращающая свеженький, девственный компаратор
function madness() {
    var cache = [];
    return function (a, b) {
        putToCache(a, cache);
        putToCache(b, cache);
        return cache.indexOf(b) - cache.indexOf(a);
    }
}
//собственно функция перемешивания
function shuffle(arr) {
    var compare = madness();
    return arr.sort(compare);
}
// конец сортировки
// функция удаления дома со страницы дома для сладера внизу
function removeHouseFromPage(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (idPage.attributes[1].value != arr[i].id) {
            houseArr.push(arr[i]);
        }
    }
    return houseArr;
};
//генерация карточек в плитку сайта
function generateCard(arr) {
    shuffle(arr);
    const housesList = document.querySelector('.houses__list');

    arrayHouses.forEach(item => { // перебераем массив с обьектами
        const { id, alt, cost, houseArea, landArea, address } = item; // Деструктуризация

        // добавляем карточку
        housesList.insertAdjacentHTML('afterbegin', `
            <div class="list__item">
                <div class="item__card">
                    <a href="/houses/${id}" class="item__img">
                        <img src="/img/uploads/individual/photos/${id}/${id}.jpg" alt="${alt}">
                    </a>
                    <ul class="item__content">
                        <li class="adress">${address}</li>
                        <li class="price">${cost} млн. ₽</li>
                        <li class="house">дом: ${houseArea} м<sup>2</sup></li>
                        <li class="place">участок: ${landArea}</li>
                    </ul>
                    <a href="/houses/${id}" class="item__btn btn _green-gradient">Узнать больше об этом доме</a>
                </div>
            </div>
        `);
    });
}
// генарация карточек в карусель
function generateSlider(arr) {
    const catalogSlider = document.querySelector('.catalog__slider'); // поиск тега куда будем вставлять карточки

    arr.forEach(item => { // перебераем массив с обьектами
        const { id, alt, cost, houseArea, landArea, address } = item; // Деструктуризация

        // добавляем карточку
        catalogSlider.insertAdjacentHTML('afterbegin', `
            <div class="catalog__item">
                <div class="item__wrap _row">
                    <div class="item__img">
                        <img data-lazy="/img/uploads/individual/photos/${id}/${id}.jpg" alt="${alt}">
                    </div>
                    <div class="item__content">
                        <ul>
                            <li class="_row">
                                <i><img src="/img/icons/price.png" alt=""></i>
                                <h4>${cost} млн. ₽</h4>
                            </li>
                            <li class="_row">
                                <i><img src="/img/icons/house.png" alt=""></i>
                                <h4>дом: ${houseArea} м<sup>2</sup></h4>
                            </li>
                            <li class="_row">
                                <i><img src="/img/icons/place.png" alt=""></i>
                                <h4>участок: ${landArea}</h4>
                            </li>
                            <li class="_row">
                                <i><img src="/img/icons/whater.png" alt=""></i>
                                <h4>Проведены коммуникации</h4>
                            </li>
                            <li class="_row">
                                <i><img src="/img/icons/geo.png" alt=""></i>
                                <h4>${address}</h4>
                            </li>
                        </ul>
                        <a href="/houses/${id}" class="item__btn btn _green-gradient">Узнать больше</a>
                    </div>
                </div>
            </div>
        `);
    });
}

function generatingSlidesWithoutHouse(arr) {
    removeHouseFromPage(arr); // запуск функции удаления повторяющегося дома из массива
    shuffle(houseArr); // перемещивание карточек
    generateSlider(houseArr); // добавление карточек на страницу
}

function generatingSlidesWithAllHouses(arr) {
    shuffle(arr); // перемещивание карточек
    generateSlider(arr); // добавление карточек на страницу
}