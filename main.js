document.querySelector('.menu-btn').addEventListener('click', () =>{
    document.querySelector('.nav-menu').classList.toggle('show')
})

const themeBtn = document.querySelector('.theme-btn');
const body = document.querySelector('body');
load();
themeBtn.addEventListener('click', e =>{
    body.classList.toggle('darkmode');
    store(body.classList.contains('darkmode'));
});

function load(){
    const darkmode = localStorage.getItem('darkmode');
    if(!darkmode){
        store('false');
    }else if(darkmode == 'true'){
        body.classList.add('darkmode');
    }
}

function store(value){
    localStorage.setItem('darkmode', value);
}




class Calendar {
    constructor(id) {
        this.cells = [];
        this.datesUnavailable = ["Mon Dec 18 2023 00:00:00 GMT-0600 (hora estándar central)", "Thu Dec 14 2023 00:00:00 GMT-0600 (hora estándar central)", "Sun Dec 17 2023 00:00:00 GMT-0600 (hora estándar central)" ];
        this.selectedDate = null;
        this.currentMonth = moment();
        this.elCalendar = document.getElementById(id);
        this.showTemplate();
        this.elGridBody = this.elCalendar.querySelector('.grid__body');
        this.elMonthName = this.elCalendar.querySelector('.month-name');
        this.showCells();
    }

    showTemplate() {
        this.elCalendar.innerHTML = this.getTemplate();
        this.addEventListenerToControls();
    }

    getTemplate() {
        let template = `
            <div class="calendar__header">
                <button type="button" class="control control--prev"><</button>
                <span class="month-name">dic 2023</span>
                <button type="button" class="control control--next">></button>
            </div>
            <div class="calendar__body">
                <div class="grid">
                    <div class="grid__header">
                        <span class="grid__cell grid__cell--gh">Lun</span>
                        <span class="grid__cell grid__cell--gh">Mar</span>
                        <span class="grid__cell grid__cell--gh">Mié</span>
                        <span class="grid__cell grid__cell--gh">Jue</span>
                        <span class="grid__cell grid__cell--gh">Vie</span>
                        <span class="grid__cell grid__cell--gh">Sáb</span>
                        <span class="grid__cell grid__cell--gh">Dom</span>
                    </div>
                    <div class="grid__body">

                    </div>
                </div>
            </div>
        `;
        return template;
    }

    addEventListenerToControls() {
        let elControls = this.elCalendar.querySelectorAll('.control');
        elControls.forEach(elControl => {
            elControl.addEventListener('click', e => {
                let elTarget = e.target;
                if (elTarget.classList.contains('control--next')) {
                    this.changeMonth(true);
                } else {
                    this.changeMonth(false);
                }
                this.showCells();
            });
        });
    }

    changeMonth(next = true) {
        if (next) {
            this.currentMonth.add(1, 'months');
        } else {
            this.currentMonth.subtract(1, 'months');
        }
    }

    showCells() {
        this.cells = this.generateDates(this.currentMonth);
        if (this.cells === null) {
            console.error('No fue posible generar las fechas del calendario.');
            return;
        }

        this.elGridBody.innerHTML = '';
        let templateCells = '';
        let disabledClass = '';
        let unavailableClass = '';
        for (let i = 0; i < this.cells.length; i++) {
            disabledClass = '';
            unavailableClass = '';
            if (!this.cells[i].isInCurrentMonth) {
                disabledClass = 'grid__cell--disabled';
            }else if(this.cells[i].unavailableDate) {
                unavailableClass = 'grid__cell--unavailable';
            }
            // <span class="grid__cell grid__cell--gd grid__cell--selected">1</span>
            templateCells += `
                <span class="grid__cell grid__cell--gd ${disabledClass} ${unavailableClass}" data-cell-id="${i}">
                    ${this.cells[i].date.date()}
                </span>
            `;
        }
        this.elMonthName.innerHTML = this.currentMonth.format('MMM YYYY');
        this.elGridBody.innerHTML = templateCells;
        this.addEventListenerToCells();
    }

    generateDates(monthToShow = moment()) {
        if (!moment.isMoment(monthToShow)) {        //verificar que sea un objeto moment
            return null;
        }
        let dateStart = moment(monthToShow).startOf('month'); /// el primer día del mese1
        let dateEnd = moment(monthToShow).endOf('month');       ///obtener el último día del mes
        let cells = [];
        const datesUnavailable = ["Mon Dec 18 2023 00:00:00 GMT-0600 (hora estándar central)", "Thu Dec 14 2023 00:00:00 GMT-0600 (hora estándar central)", "Sun Dec 17 2023 00:00:00 GMT-0600 (hora estándar central)", "Sat Dec 23 2023 00:00:00 GMT-0600 (hora estándar central)", "Sat Dec 30 2023 00:00:00 GMT-0600 (hora estándar central)", "Sat Jan 06 2024 00:00:00 GMT-0600 (hora estándar central)", "Tue Jan 16 2024 00:00:00 GMT-0600 (hora estándar central)", "Sun Jan 21 2024 00:00:00 GMT-0600 (hora estándar central)", "Sat Jan 27 2024 00:00:00 GMT-0600 (hora estándar central)", "Fri Feb 02 2024 00:00:00 GMT-0600 (hora estándar central)", "Sat Feb 10 2024 00:00:00 GMT-0600 (hora estándar central)", "Sat Feb 24 2024 00:00:00 GMT-0600 (hora estándar central)"];

        // Encontrar la primer fecha que se va a mostrar en el calendario
        while (dateStart.day() !== 1) {  //1 = lunes
            dateStart.subtract(1, 'days');      //quitar un día a la fecha consultada
        }

        // Encontrar la última fecha que se va a mostrar en el calendario
        while (dateEnd.day() !== 0) {
            dateEnd.add(1, 'days');
        }

        // Genera las fechas del grid
        
        do {
                cells.push({
                    date: moment(dateStart),
                    isInCurrentMonth: dateStart.month() === monthToShow.month(),
                }); 
            dateStart.add(1, 'days');
            console.log(cells)
        } while (dateStart.isSameOrBefore(dateEnd)); //

        for(let i = 0; i<35; i++){
            for(let j = 0; j < datesUnavailable.length; j++){
                if(cells[i].date._d == datesUnavailable[j]){
                    cells[i].unavailableDate = "true";
                }
                console.log(cells[i]);
            }    
        }   
        return cells;
    }

    addEventListenerToCells() {
        let elCells = this.elCalendar.querySelectorAll('.grid__cell--gd');
        elCells.forEach(elCell => {
            elCell.addEventListener('click', e => {
                let elTarget = e.target;
                if (elTarget.classList.contains('grid__cell--disabled') || elTarget.classList.contains('grid__cell--selected')) {
                    return;
                }
                // Deselecionar la celda anterior
                let selectedCell = this.elGridBody.querySelector('.grid__cell--selected');
                if (selectedCell) {
                    selectedCell.classList.remove('grid__cell--selected');
                }
                // Selecionar la nueva celda
                elTarget.classList.add('grid__cell--selected');
                this.selectedDate = this.cells[parseInt(elTarget.dataset.cellId)].date;
                // Lanzar evento change
                this.elCalendar.dispatchEvent(new Event('change'));
            });
        });
    }

    getElement() {
        return this.elCalendar;
    }

    value() {
        return this.selectedDate;
    }
}

ScrollReveal().reveal('.showcase');
ScrollReveal().reveal('.banner-one' , {delay:300});
ScrollReveal().reveal('.cards' , {delay:300});
ScrollReveal().reveal('.contact' , {delay:300});