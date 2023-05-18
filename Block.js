const LibraryCreator = {
  start: (blocksJSON, category, text) => {
    let blockArray = new Array
    // LibraryCreator 가져오기
    Entry.staticBlocks = [

    ];
    EntryStatic.getAllBlocks = () => {
      return Entry.staticBlocks;
    }
    function updateCategory(category, options) {
      Entry.playground.mainWorkspace.blockMenu._generateCategoryView([
        { category: 'start', visible: true },
        { category: 'flow', visible: true },
        { category: 'moving', visible: true },
        { category: 'looks', visible: true },
        { category: 'brush', visible: true },
        { category: 'text', visible: true },
        { category: 'sound', visible: true },
        { category: 'judgement', visible: true },
        { category: 'calc', visible: true },
        { category: 'variable', visible: true },
        { category: 'func', visible: true },
        { category: 'analysis', visible: true },
        { category: 'ai_utilize', visible: true },
        { category: 'expansion', visible: true },
        { category: category, visible: true },
        { category: 'arduino', visible: true }
      ]);
      for (let i = 0; i < $('.entryCategoryElementWorkspace').length; i++) {
        if (!($($('.entryCategoryElementWorkspace')[i]).attr('id') == "entryCategorytext")) {
          $($('.entryCategoryElementWorkspace')[i]).attr('class', 'entryCategoryElementWorkspace');
        }
      }
      Entry.playground.blockMenu._categoryData = EntryStatic.getAllBlocks();
      Entry.playground.blockMenu._generateCategoryCode(category);
      if (options) {
        if (options.background) {
          $(`#entryCategory${category}`).css('background-image', 'url(' + options.background + ')');
          $(`#entryCategory${category}`).css('background-repeat', 'no-repeat');
          if (options.backgroundSize) {
            $(`#entryCategory${category}`).css('background-size', options.backgroundSize + "px");
          }
        }
        if (options.name) {
          $(`#entryCategory${category}`)[0].innerText = options.name
        }
      }
    }
    function addBlock(blockname, template, color, params, _class, func, skeleton = 'basic') {
      Entry.block[blockname] = {
        color: color.color,
        fontColor: color.font,
        outerLine: color.outline,
        skeleton: skeleton,
        statement: [],
        params: params.params,
        events: {},
        def: {
          params: params.define,
          type: blockname
        },
        paramsKeyMap: params.map,
        class: _class ? _class : 'default',
        func: func,
        template: template
      }
    }
    // 블록 추가하기
    for (let i in blocksJSON) {
      let block = blocksJSON[i]
      blockArray.push(block.name)
      addBlock(block.name, block.template, { color: block.color.default, outerLine: block.color.darken }, { params: block.params, define: block.def, map: block.map }, block.class, block.func, block.skeleton)
    }
    // 블록 반영
    Entry.staticBlocks.push({ category: category, blocks: blockArray })
    // 카테고리 업데이트 (ws에서만)
    if (typeof useWebGL == "undefined") {
      updateCategory(category)
      // 아이콘 적용
      $('head').append(`<style>#entryCategory${category}{background-image:url(https://raw.githack.com/JEJUCE/EntryBlock/main/logo.svg);background-repeat:no-repeat;margin-bottom:1px;backgrfpound-position-y: 10px;background-size: 20px;}.entrySelectedCategory#entryCategory${category}{background-image:url(https://raw.githack.com/JEJUCE/EntryBlock/main/logo.svg);background-color:#000000;border-color:#000000;color:#fff}</style>`)
      // 카테고리 이름 적용
      $(`#entryCategory${category}`).append(text)
    }
  }
}
const blocks = [
//////////////////////////////////////
    
//////////////////////////////////////
  {
    name: 'firsttext', // 이름 지정
    template: '%1', // 표시할 내용
    skeleton: 'basic_text', // 형식(기본 텍스트)
    color: { // 색깔
      default: EntryStatic.colorSet.common.TRANSPARENT, // 투명
      darken: EntryStatic.colorSet.common.TRANSPARENT // 투명
    },
    params: [ // %n의 형식 지정
      { // %1의 형식 정의
        type: 'Text', // 텍스트 형식
        text: '웹', // 표시 내용
        color: EntryStatic.colorSet.common.TEXT, // 검은색
        align: 'center'
      }
    ],
    def: [],
    map: {},
    class: 'text'
  },
//////////////////////////////////////
//////////////////////////////////////
  {
    name: 'Testblock', // 블럭 이름 지정
    template: '블럭테스트', // 표시할 내용
    skeleton: 'basic', // 블럭 형식(basic은 일반 블럭)
    color: { // 색깔
      default: '#00b9c2', //RGB 색깔
      darken: '#00b9c2' //RGB 색깔
    },
    params: [ // %n 정의
      { // %1 정의
        type: 'Block', // 형식 지정(입력값)
        accept: 'string'
      }
    ],
    def: [ // %n 기본값
      { // %1 정의
        type: 'text',
        params: ['entry'] // 기본으로 입력된 값
      },
      null // %2 정의(이미지 형식이므로 null로 설정)
    ],
    map: {
      Test: 0 // %1의 입력값을 불러올 변수 이름(대문자)
    },
    class: 'text',
    func: async (sprite, script) => { // 실행할 JS 코드
      return script.callReturn() // 일반 블럭 코드 뒤에는 반드시 붙여주세요
    },
  }, 
//////////////////////////////////////
  {
    name: 'digit on&off', // 블럭 이름 지정
    template: '디지털 %1번 핀 %2',
    skeleton: 'basic', // 블럭 형식(basic은 일반 블럭)
    color: { // 색깔
      default: '#00b9c2', //RGB 색깔
      darken: '#00b9c2' //RGB 색깔
    },
    params: [
			{
				type: 'Block',
				accept: 'string'
			},
			{
				type: 'Dropdown',
				options: [
					['켜기', '1'],
					['끄기', '0'],
				],
				fontSize: 11,
				arrowColor: '#f78640',
				value: '켜기'
			},

		],
		def: [
			{
				type: 'text',
				params: [`1`]
			},
			null,
			null
		],
		map: {
			CONTENT: 0,
			TYPE: 1
		},
		class: 'text',
		func: async (sprite, script) => {
			console[script.getValue('TYPE', script)](script.getValue('CONTENT', script));
			return script.callReturn();
		},
	},

//////////////////////////////////////
//////////////////////////////////////
  {
    name: 'digit turn', // 블럭 이름 지정
    template: '디지털 %1번 핀을 %2(으)로 정하기',
    skeleton: 'basic', // 블럭 형식(basic은 일반 블럭)
    color: { // 색깔
      default: '#00b9c2', //RGB 색깔
      darken: '#00b9c2' //RGB 색깔
    },
    params: [
      {
        type: 'Block',
        accept: 'string'
      },
      {
        type: 'text',
        params: [`255`]
      },

    ],
    def: [
      {
        type: 'text',
        params: [`1`]
      },
      null,
      null
    ],
    map: {
      CONTENT: 0,
      TYPE: 1
    },
    class: 'text',
    func: async (sprite, script) => {
      console[script.getValue('TYPE', script)](script.getValue('CONTENT', script));
      return script.callReturn();
    },
  },

	{
		name: 'T&H',
		template: '온습도센서 값',
		skeleton: 'basic_string_field',
		color: {
			default: '#00b9c2',
			darken: '#00b9c2'
		},
		params: [],
		def: [],
		map: {},
		class: 'text',
		func: async (sprite, script) => {
			let pagetitle = document.title;
			return pagetitle;
		},
	},  


]
  alert('로딩완료')
document.title = "Entry_Block";
LibraryCreator.start(blocks, 'API', 'Test')
