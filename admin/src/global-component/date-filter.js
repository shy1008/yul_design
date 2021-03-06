Vue.component('date-filter', {
    template: `<div class="search_wrap">
                <div class="panel">
                    <ul>
                        <li><h5>등록일</h5></li>
                        <li>
                            <div class="daterange">
                                <label for="datepicker-default"><i class="material-icons md-18">date_range</i></label>
                                <input type="text" class="" name="start" id="datepicker-default" placeholder="날짜선택"/>
                            </div>
                            ~
                            <div class="daterange">
                                <label for="datepicker-autoClose"><i class="material-icons md-18">date_range</i></label>
                                <input type="text" class="" name="end" id="datepicker-autoClose" placeholder="날짜선택" />
                            </div>
                            <div class='search_btn'><i class="material-icons" id='search' v-on:click='SearchDateData'>search</i></div>
                        </li>
                        <li><h5>검색종류</h5></li>
                        <li class="search_input">
                            <div>
                                <select id="select_class">
                                        <option value="tit" selected>시공분류</option>
                                </select>
                            </div>
                            <div>
                                <select id='search_value'>
                                    <option value="">분류옵션</option>
                                    <option value="home">주거공간</option>
                                    <option value="office">사무공간</option>
                                    <option value="store">상업공간</option>

                                </select>                                
                            </div>
                            <div class='search_btn'><i class="material-icons" id='search' v-on:click='SeachStandard'>search</i></div>
                        </li>
                    </ul>
                </div>
            </div>`,
    mounted() {
        this.dataPicker()
    },
    data() {
        return {
            DateSearch: null,
            DataValue: null
        }
    },
    methods: {
        dataPicker() {
            handleDatepicker();
        },
        SearchDateData() {
            const FrontDate = document.getElementById('datepicker-default');
            const BackDate = document.getElementById('datepicker-autoClose');
            // const SelectClass = document.getElementById('select_class');
            // const SearchValue = document.getElementById('search_value');

            if (FrontDate.value == "") {
                alert('기준날짜를 선택해주세요')
                FrontDate.focus()
            } else if (BackDate.value == "") {
                alert('기준날짜를 선택해주세요')
                BackDate.focus()
            } else {
                this.DateSearch = {
                    FrontDate: FrontDate.value,
                    BackDate: BackDate.value
                }
                if (this.DataValue == null) {
                    eventBus.$emit('searchData', {
                        FrontDate: FrontDate.value,
                        BackDate: BackDate.value,
                        // 검색 조건 => main-bord.js
                    })
                } else {
                    eventBus.$emit('searchData', {
                        FrontDate: FrontDate.value,
                        BackDate: BackDate.value,
                        SearchValue: this.DataValue
                        // 검색 조건 => main-bord.js
                    })
                }
            }
        },
        SeachStandard() {
            const SearchValue = document.getElementById('search_value');
            if (SearchValue.value == "") {
                alert('검색할 분류를 선택해주세요')
                SearchValue.focus()
            } else {
                this.DataValue = SearchValue.value;
                console.log(this.DateSearch)
                if (this.DateSearch == null) {

                    eventBus.$emit('searchData', {
                        SearchValue: SearchValue.value
                        // 검색 조건 => main-bord.js
                    })
                }
                else{
                    eventBus.$emit('searchData', {
                        FrontDate: FrontDate.value,
                        BackDate: BackDate.value,
                        SearchValue: this.DataValue
                        // 검색 조건 => main-bord.js
                    })
                }

            }


        }
    }

})
