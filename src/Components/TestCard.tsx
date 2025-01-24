import { useState } from "react";
import { PageStack, Page } from "./TestCard.styles";

const pages = [
    { id: 1, title: "Тестовое задание" },
    { id: 2, title: "Прекрасный код" },
    { id: 3, title: "Покрытие тестами" },


  ];
  
  function Card() {
 
  
  
  
    return (
      <PageStack>
        {pages.map((page, index) => (
          <Page key={page.id} index={index} total={pages.length}>
          
          </Page>
        ))}
  
      
      </PageStack>
    );
  }
  

export default Card;
