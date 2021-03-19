## 실행 방법

실행 전 설정   
- npm install 명령어를 통하여 노드 모듈 설치

client   
 - 실행위치: root  
 - 싱행 명령어: npm run start-front
 
 server  
 - 실행 위치: root  
 - 실행 명령어: npm run start-server
 
### 구현내용
- 투두리스트 read, create, delete, complete
- 투두리스트 간의 참조 
  - 복수 참조시 아이디 입력을 콤마로 구분 ex) 1,2
  - 부모 할일 완료 이전에 자식 할일 완료 불가 
- 페이지 네이션

### 해결해야할 이슈 (수정중)
- restful api (O)
- 투두리스트 수정 기능 추가
- 검색 기능 추가 (O)
- 자기 참조, 순환참조
- 인라인 스타일
- 페이지 네이션 개선
