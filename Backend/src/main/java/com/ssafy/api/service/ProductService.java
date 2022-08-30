package com.ssafy.api.service;

import com.ssafy.api.dto.DatePriceDto;
import com.ssafy.api.request.DatePriceReq;
import com.ssafy.domain.ProductPrice.Product;
import com.ssafy.domain.ProductPrice.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilderFactory;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    String apikey="yourkey";
    String id="yourid";

    /**
     * 어제자 최신 농산물 데이터를 반환하는 비즈니스 메서드
     */
    public List<Product> getMain() {
        // 데이터를 받아옴
        List<Product> products = productRepository.findAll();

        // 최신 데이터가 아니면 새 데이터를 받아와서 새로 삽입하고 다시 받아옴
        if(products.size()==0 || products.get(0).getName().equals((LocalDate.now().minusDays(1)).toString())) {
            products = updateMain();
        }

        return products;
    }

    /**
     * 특정 농산물 품목의 일주일간의 가격 데이터를 반환하는 비즈니스 메서드
     */
    public List<DatePriceDto> getDatePrice(DatePriceReq priceInfo) {
        List<DatePriceDto> datePrices = new ArrayList<>();
        LocalDate localDate = LocalDate.parse(priceInfo.getDate(), DateTimeFormatter.ISO_DATE);
        try {
            String url = "https://www.kamis.or.kr/service/price/xml.do?action=periodProductList" +
                            "&p_productclscode=02" +
                            "&p_startday="+localDate.minusDays(8).toString() +
                            "&p_endday="+priceInfo.getDate() +
                            "&p_itemcategorycode="+priceInfo.getProduct().split("")[0]+"00" +
                            "&p_itemcode="+priceInfo.getProduct() +
                            "&p_convert_kg_yn=Y" +
                            "&p_cert_key="+apikey +
                            "&p_cert_id="+id +
                            "&p_returntype=xml";

            System.out.println(url);

            Document documentInfo = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(url);

            // root tag
            documentInfo.getDocumentElement().normalize();

            // 파싱할 tag
            NodeList nList = documentInfo.getElementsByTagName("item");

            for(int i=1; i<nList.getLength(); i++) {
                Node nNode = nList.item(i);
                if(nNode.getNodeType() == Node.ELEMENT_NODE) {
                    Element element = (Element) nNode;

                    if(!getTagValue("countyname", element).equals("평균")) {
                        continue;
                    }

                    DatePriceDto dateprice = DatePriceDto.builder()
                                                        .day(getTagValue("regday", element))
                                                        .price(getTagValue("price", element))
                                                        .build();
                    datePrices.add(dateprice);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return datePrices;
    }

    /**
     * 테이블의 데이터가 최신이 아닐 경우 최신화 시키는 메서드
     */
    public List<Product> updateMain() {
        List<Product> products = new ArrayList<>();

        // xml 파싱하고 새로저장하고 리턴
        try {
            String url = "https://www.kamis.or.kr/service/price/xml.do?action=dailySalesList&p_cert_key="+apikey+"&p_cert_id="+id+"&p_returntype=xml";

            Document documentInfo = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(url);

            // root tag
            documentInfo.getDocumentElement().normalize();

            // 파싱할 tag
            NodeList nList = documentInfo.getElementsByTagName("item");

            label:for(int i=1; i<nList.getLength(); i++){
                Node nNode = nList.item(i);
                if(nNode.getNodeType() == Node.ELEMENT_NODE) {
                    Element element = (Element) nNode;

                    if(getTagValue("product_cls_name", element).equals("소매")) continue;

                    Product product = Product.builder()
                                                .name(getTagValue("item_name", element).split("/")[0])
                                                .unit(getTagValue("unit", element))
                                                .direction(getTagValue("direction", element))
                                                .value(getTagValue("value", element))
                                                .date(getTagValue("lastest_day", element))
                                                .price(getTagValue("dpr1", element))
                                                .build();
                    // 배추, 오이, 토마토, 당근, 무, 감자 필터링 하면서 중복제거 : 추후 스트림으로 리팩토링 필요
                    String name=product.getName();
                    if(name.equals("배추")||name.equals("오이")||name.equals("토마토")
                            ||name.equals("당근")||name.equals("무")||name.equals("감자")) {
                        for(Product p:products) {
                            if(p.getName().equals(name)) continue label;
                        }
                        products.add(product);
                    }
                }
            }
        } catch (Exception e){
            e.printStackTrace();
        }
        productRepository.deleteAll(); // 테이블 초기화
        productRepository.saveAll(products); // 최신화 데이터 저장
        return products;
    }

    private static String getTagValue(String tag, Element element) {
        NodeList nodeList = element.getElementsByTagName(tag).item(0).getChildNodes();
        Node node = (Node) nodeList.item(0);
        if(node == null) return null;
        return node.getNodeValue();
    }

}
