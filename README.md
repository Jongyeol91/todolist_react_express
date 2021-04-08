## 실행 방법  
- git clone
- root에서 npm install 명령어를 통하여 노드 모듈 설치

client 실행 방법  
 - 실행위치: **root**  
 - 싱행 명령어: **npm run start-front**
 
server 실행 방법 
 - 실행 위치: **root**  
 - 실행 명령어: **npm run start-server**

### PULL 안될경우
- server/db/database.sqlite 삭제 후 pull
- npm install
- 그래도 안되면 clone 
 
### 구현내용
- 투두리스트 read, create, delete, complete, update
- 투두리스트 간의 참조 
  - 셀렉박스로 복수 선택 가능
  - 부모 할일 완료 이전에 자식 할일 완료 불가 
  - 삭제는 편의를 위해 부모 자식간에 영향을 주지 않음
- 검색 기능
- 페이지 네이션

### 수정내용
- restful api (O)
- 투두리스트 수정 기능 추가 (O)
- 검색 기능 추가 (O)
- 자기 참조, 순환참조(O)
- 인라인 스타일(O)
- 페이지 네이션 개선(O)

### 사용기술
- react, redux-toolkit, node.js, express, knex, sqlite
