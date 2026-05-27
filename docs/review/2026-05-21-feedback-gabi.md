# Feedback Gabi — comentários abertos (validação)

**Fonte:** review widget (Supabase review-sanches) · **Total:** 63 comentários `open` · **Gerado:** 2026-05-22

**Status:** ✅ 63/63 aplicados no código (15 em 2026-05-25 + 48 em 2026-05-27). Threads no Supabase ainda NÃO resolvidas (aguardando validação). Cada item: âncora (texto onde o pin foi colocado) → ação pedida. IDs preservados pra resolver no Supabase depois.

## ⚠️ Decisões de interpretação (revisar com a Gabi)

- **Item 1 (newsletter rodapé):** âncora era o newsletter GLOBAL do `Footer.tsx` (aparece em todas as páginas). Como remover só o texto deixaria o formulário órfão, removi a **seção newsletter inteira** do rodapé — afeta o site todo. Reversível.
- **Item 23/24 (business-lounge):** movi "A Premium Address for Your Success…" pro título do hero (item 23) e removi o `aboutTitle` duplicado (item 24).
- **Item 30 (grow-your-company):** âncora vazia; "Apply Your Startup" foi adicionado como botão no hero (que não tinha CTA), linkando a `/contact?subject=forge`.
- **Item 46 (conference-rooms):** "theater layout" → "cinema layout" aplicado **só na descrição ancorada (sala SHIFT, 110m²)**. O termo "theater" ainda aparece em INDIGO/INCUBATOR/BOND/ESCAPE — confirmar se quer trocar em todas.
- **Item 55 (food/spot):** botão "See the Menu" criado, mas **não há página/PDF de menu** no projeto. Linkado provisoriamente a `/food` (TODO no código). Precisa da URL real do menu.
- **Item 56 (food/spot):** "tirar essa seção" → removida a seção inteira "The SPOT Standard" (3 cards: Curated Wine List, Corporate Standards, Flawless Service). Se a intenção era só o card "Curated Wine List", reverter os outros dois.
- **Traduções HR:** todas as strings novas foram traduzidas de forma conservadora — validar com falante nativo.

---


## `/community` (11)

1. **âncora:** "Subscribe to our NewsletterGet the latest updates on workspace trends,"
   - **ação:** tirar essa seção
   - `1a55c475` · ✅ feito

2. **âncora:** "Sign up for the WESPA newsletter and get community updates, event invi"
   - **ação:** tirar esse texto
   - `9ba873c4` · ✅ feito

3. **âncora:** "Events That Connect"
   - **ação:** trocar título para  Events that Connect
   - `89537f9b` · ✅ feito

4. **âncora:** "Founders and creators building from inside WESPA."
   - **ação:** tirar o texto
   - `f45e0828` · ✅ feito

5. **âncora:** "Macro signals shaping the work and life economy."
   - **ação:** tirar o texto
   - `e8cb5983` · ✅ feito

6. **âncora:** "Updates, openings, and behind-the-scenes from our spaces."
   - **ação:** tirar o texto
   - `fa4ce862` · ✅ feito

7. **âncora:** "Community members get the opportunity to be featured as guests and sha"
   - **ação:** tirar essa frase
   - `8e3c1b58` · ✅ feito

8. **âncora:** "WESPA Community Membership."
   - **ação:** tirar a frase Wespa Community Membership
   - `028eec01` · ✅ feito

9. **âncora:** "24/7 Access"
   - **ação:** alterar título para: 24/7 Space Access
   - `3e3b1513` · ✅ feito

10. **âncora:** "Become a Member"
   - **ação:** alterar título para: Become a Community Member
   - `3f45f98a` · ✅ feito

11. **âncora:** "Get in Touch"
   - **ação:** trocar para: Become a Member
   - `6da4b8c8` · ✅ feito


## `/workspaces/coworking` (11)

12. **âncora:** "/day"
   - **ação:** tirar: /day
   - `023ff205` · ✅ feito

13. **âncora:** "€30"
   - **ação:** trocar para €30.00
   - `ae4988fd` · ✅ feito

14. **âncora:** "€35/day+ VAT"
   - **ação:** trocar para: €35.00 + VAT
   - `03be46f6` · ✅ feito

15. **âncora:** "€219/month+ VAT"
   - **ação:** trocar para: €219.00 + VAT
   - `7c59d1fa` · ✅ feito

16. **âncora:** "Most Popular"
   - **ação:** tirar
   - `e2e59b49` · ✅ feito

17. **âncora:** "€226/month+ VAT"
   - **ação:** trocar para: €226.00 + VAT
   - `65d98370` · ✅ feito

18. **âncora:** "✓Private office (2-6 people)"
   - **ação:** tirar
   - `d5b72882` · ✅ feito

19. **âncora:** "Get Started"
   - **ação:** trocar texto para: Book Your Desk
   - `7da9aead` · ✅ feito

20. **âncora:** "Get Started"
   - **ação:** trocar texto para: Book Your Desk
   - `7f9c3499` · ✅ feito

21. **âncora:** "Get Started"
   - **ação:** trocar texto para: Book Your Desk
   - `dd311dd2` · ✅ feito

22. **âncora:** "Get Started"
   - **ação:** trocar texto para: Book Your Desk
   - `32e9a461` · ✅ feito


## `/location/business-lounge` (7)

23. **âncora:** "The Premium WESPA Experience"
   - **ação:** trocar titulo para: A Premium Address for Your Success: WESPA Business & Lounge
   - `9787c5fe` · ✅ feito

24. **âncora:** "A Premium Address for Your Success: WESPA Business & Lounge"
   - **ação:** excluir
   - `7df79951` · ✅ feito

25. **âncora:** "Radnička cesta 50, Zagreb"
   - **ação:** trocar para: Radnička cesta 50, 10000 Zagreb, Croatia
   - `09cb000c` · ✅ feito

26. **âncora:** "AddressWESPA Business & LoungeGreen Gold Business CentreRadnička cesta"
   - **ação:** incluir abaixo do endereço:  Reception: +385 95 340 0984
   - `62a2a037` · ✅ feito

27. **âncora:** "What's at Business & Lounge"
   - **ação:** trocar para: What Green Gold Offers
   - `c348211f` · ✅ feito

28. **âncora:** "Private Workspaces"
   - **ação:** trocar título para: Exclusive Offices
   - `c3618295` · ✅ feito

29. **âncora:** "Book a Tour"
   - **ação:** trocar texto para: Request a Premium Quote
   - `1f6f3039` · ✅ feito


## `/grow-your-company` (5)

30. **âncora:** ""
   - **ação:** incluir um botão: "Apply Your Startup"
   - `4196c855` · ✅ feito

31. **âncora:** "Our Process"
   - **ação:** trocar título para: How We Work?
   - `4f13f311` · ✅ feito

32. **âncora:** "Our ProcessA structured, hands-on approach to unlocking your next stag"
   - **ação:** abaixo do título colocar um mini texto: "Structured process, measurable results."
   - `f1e45121` · ✅ feito

33. **âncora:** "Market Expansion"
   - **ação:** trocar título para: "Expansion & Capital Bridge"
   - `2add29d6` · ✅ feito

34. **âncora:** "Apply now"
   - **ação:** colocar tudo em maíusculo: APPLY NOW
   - `38521ed7` · ✅ feito


## `/workspaces/offices` (5)

35. **âncora:** "Beyond the standard office."
   - **ação:** tirar o ponto final
   - `950384e7` · ✅ feito

36. **âncora:** "Choose the format that fits how your team operates today."
   - **ação:** tirar texto
   - `53056af4` · ✅ feito

37. **âncora:** "Book a visit"
   - **ação:** "Book your office now"
   - `5bf0c5eb` · ✅ feito

38. **âncora:** "Book a visit"
   - **ação:** "Book your office now"
   - `a3952eb8` · ✅ feito

39. **âncora:** "Book a visit"
   - **ação:** "Book your office now"
   - `92d8bfe4` · ✅ feito


## `/location/urban-hub` (4)

40. **âncora:** "Step into the space that has become the heart of Zagreb’s startup cult"
   - **ação:** trocar texto para: Step into the space that has become the heart of Zagreb's startup culture. Whether you need a spot in our coworking hub or the privacy of your own office, everything is tailored to your pace, supporting your professional growth all the way.
   - `90c5abab` · ✅ feito

41. **âncora:** "What You Will Find Here"
   - **ação:** trocar título para: What Zavrtnica Offers
   - `b4848825` · ✅ feito

42. **âncora:** "Heinzelova ulica 60, Zagreb"
   - **ação:** trocar texto para: Heinzelova ulica 60, 10000 Zagreb, Croatia
   - `dce431d2` · ✅ feito

43. **âncora:** "Join the Community"
   - **ação:** trocar título para: "Schedule a Tour"
   - `b557882e` · ✅ feito


## `/workspaces/conference-rooms` (4)

44. **âncora:** "WESPA Urban Hub (Zavrtnica 17)"
   - **ação:** trocar título para: Venues at WESPA Urban Hub (Zavrtnica 17)
   - `477fa127` · ✅ feito

45. **âncora:** "WESPA Business & Lounge (Green Gold)"
   - **ação:** trocar título para: Venues at WESPA Business & Lounge (Green Gold)
   - `96ccb5b8` · ✅ feito

46. **âncora:** "A 110m² space with two projectors, screens, and two fixed TVs. Accommo"
   - **ação:** trocar a palavra "theater layout" para "cinema layout"
   - `33d28900` · ✅ feito

47. **âncora:** "Book a Conference Room"
   - **ação:** trocar texto do botão para: Get a Quote
   - `fa4b7182` · ✅ feito


## `/workspaces/meeting-rooms` (4)

48. **âncora:** "€350"
   - **ação:** trocar para: €350.00
   - `71393470` · ✅ feito

49. **âncora:** "€750"
   - **ação:** trocar para: €750.00
   - `f2f95b56` · ✅ feito

50. **âncora:** "€850"
   - **ação:** trocar para: €850.00
   - `abd55059` · ✅ feito

51. **âncora:** "Book a visit"
   - **ação:** trocar texto para: "Book a Room"
   - `b709057e` · ✅ feito


## `/events/custom-special-events` (3)

52. **âncora:** "Support"
   - **ação:** trocar título para: "Full Service Support"
   - `47e0ee3f` · ✅ feito

53. **âncora:** "Food & DrinkGood food makes a great event even better.Restaurant Papel"
   - **ação:** incluir texto abaixo de "Good food makes a great event even better" texto: "Restaurant Papel & restaurant SPOT offer a wide range of contemporary international and regional cuisine. Our focus is on quality ingredients and the highest level of service, whether for an elegant fine dining experience or a relaxed buffet."
   - `696ef1da` · ✅ feito

54. **âncora:** "Get in Touch"
   - **ação:** trocar texto para: "Check date availability for your event."
   - `d07ab5e2` · ✅ feito


## `/food/spot` (3)

55. **âncora:** "The SPOT Experience"
   - **ação:** incluir botão: See the Menu
   - `6f358c6e` · ✅ feito

56. **âncora:** "The SPOT StandardCurated Wine ListAn expertly assembled selection of w"
   - **ação:** tirar essa seção
   - `07c3fcf5` · ✅ feito

57. **âncora:** "Find UsWESPA Spaces — Urban HubHeinzelova ulica 60, Zagreb"
   - **ação:** mudar endereço para WESPA Specaes - Green Gold  Radnička cesta 50, Zagreb
   - `c0b35cd6` · ✅ feito


## `/events/custom-business-events` (2)

58. **âncora:** "With 10 halls across two locations, state-of-the-art AV equipment, and"
   - **ação:** Incluir título: "A flexible space that works for you."
   - `f7a0f617` · ✅ feito

59. **âncora:** "Get in touch"
   - **ação:** trocar texto para: "Check date availability for your event."
   - `82aeabce` · ✅ feito


## `/food/papel` (2)

60. **âncora:** "Everything you need for a quality break. A relaxed community restauran"
   - **ação:** separar o texto "Everything you need for a quality break" do restante do texto
   - `e1fa2290` · ✅ feito

61. **âncora:** "Everything you need for a quality break. A relaxed community restauran"
   - **ação:** A relaxed community restaurant tailored to the pace of modern business. Choose from premium daily specials and an a la carte menu made with nutrient-rich ingredients that provide energy without the heavy feel. The ideal spot for an informal meeting or a business lunch.
   - `b768f2d8` · ✅ feito


## `/workspaces/custom-office-zones` (2)

62. **âncora:** "Workspaces / Office ZonesCustom office suites tailored to your needsSe"
   - **ação:** incluir abaixo do título o texto: Full-service office solutions for larger teams and established companies.
   - `873207ab` · ✅ feito

63. **âncora:** "Request a Quote"
   - **ação:** trocar o texto para: "Request a Custom Quote"
   - `b0db24f9` · ✅ feito
