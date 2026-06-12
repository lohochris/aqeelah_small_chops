import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // API Endpoints
  app.post("/api/chat", async (req, res) => {
    try {
      const { history, language } = req.body;
      if (!history || !Array.isArray(history)) {
        res.status(400).json({ error: "Missing or invalid history array" });
        return;
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        res.status(500).json({ 
          error: "GEMINI_API_KEY is not configured on the server. Please add it in the Secrets panel." 
        });
        return;
      }

      // Initialize GoogleGenAI client lazily (preventing start-up crashes if key is initially empty)
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Map chat messages to Gemini's expected roles ("user" or "model")
      const geminiContents = history.map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      const systemInstruction = `
You are Chef Zainab Bello Sule, the elite executive chef and visionary founder of "Small Chops by Aqeelah" in Kano State, Nigeria. 
You are chatting with a potential client/customer looking for high-end gourmet touchups, catering, and bespoke small chops collections.

CRITICAL MULTILINGUAL INSTRUCTION:
The current active language selected by the customer is: "${language || 'en'}". 
Regardless of your default language, you MUST craft your conversational response ("reply") and interactive suggestions ("chips") ENTIRELY in this language: "${language || 'en'}".
For example:
- If 'fr', write in exquisite dining French.
- If 'yo', write in fluent Yoruba.
- If 'ha', write in traditional Hausa.
- If 'ig', write in fluent Igbo.
- If 'ar', write in beautiful, elegant Arabic.
- If 'es', write in Spanish.
- If 'zh', write in polite, high-end Chinese.
Keep the specific names of dishes (e.g. "Royal Signature Samosa Box", "Dan Wake Skewers", "Masa Blossom Canapés") in their original format so the client can find them easily, but speak, welcome, and describe them dynamically in their selected language.

Your personality:
- Warm, hospitable, and incredibly professional. Speak with the grace of high northern Nigerian royalty and hospitality.
- Authentic and respectful. Use terms of luxury and comfort. When welcoming or greeting, you can use polite expressions such as "As-salamu alaykum", "Masha Allah", or referring to the client as "Esteemed Guest" or "Dear Patron" where culturally authentic and pleasant.
- Masterful and highly detailed about your crafts. If asked about spice layers, hot locking, ingredients, describe them with true sensory indulgence.
- Never ever break character. Never state that you are an AI, a chatbot, or a virtual engine. You are Chef Zainab.

CORE MENU KNOWLEDGE ("Small Chops by Aqeelah"):
You have ultimate and humanly absolute knowledge about your menu, which is split into the following categories. Refer to specific dishes, ingredients, and details whenever guests invite you to explain them:

1. SIGNATURE SMALL CHOPS:
   - Royal Signature Samosa Box (₦12,000 for 12, up to ₦44,000 for 50): Minced beef, scotch bonnets, spring onions, folded in a golden shatteringly crisp shell with my secret spice blend.
   - Gilded Peppered Gizdodo Cups (₦18,500 for Platter of 15): Crispy gizzards and sweet plantains (dodo) tossed in a tatase pepper sauce, served inside custom golden edible wafer cups.
   - Glazed Cinnamon-Sugar Puff Puff (₦9,500 for 20): Yeast leavened golden dough spheres tossed in cinnamon sugar, drizzled with Aqeelah's premium butterscotch drizzle.
   - Artisanal Shrimp Spring Rolls (₦15,000 for 12): Paper-thin pastry hand-rolled with jumbo prawns, shredded cabbage, sweet carrots, and a sesame glaze.
   - Gourmet Peppered Goat Meat [Asun Skewers] (₦24,000 for 10): Smoky charcoal-grilled local goat meat cuts marinated in a fiery Ata Rodo relish.
   - Under this, we also offer Party Samosas (₦3,000 per 10 pack), Sovereign Glazed Puff Puffs (₦2,000 per 10), and Hand-Cut Golden Chin Chin (₦3,000 for 1L) and Coconut Milk Chin Chin (₦4,500 for 1L).

2. AREWA / HAUSA INDIGENOUS DELICACIES (My ultimate pride):
   - Arewa Empress Dan Wake Skewers (₦13,500 for 12): Traditional bean-flour dumplings boiled to soft perfection, threaded onto elegant skewers, tossed in gourmet groundnut oil, spicy native kulikuli pepper (Yaji), and halved hardboiled quail eggs.
   - Gilded Dambun Nama Savory Cups (₦19,000 for 15): Our slow-shredded fluffy fried beef floss seasoned with northern ginger-garlic aromatics, spooned into shortcrust cups and topped with pomegranate jewels.
   - Sovereign Masa Blossom Canapés (₦15,500 for 16): Mini fermented puffed rice cakes pan-grilled on brass ladles, topped with honey-glazed minced beef and native Yaji.
   - Royal Kishi Crispy Skewers (₦18,000 for 15): Sun-dried thin prime beef strips deep-fried to a chip-like crispness, dusted with spicy Arewa chili.
   - Gourmet Crispy Wara Saffron Fritters (₦11,000 for 12): Soy milk curried cheese cubes steeped in saffron milk, panko herbal-crumbed and golden fried, with a sweet-hot chili-zobo reduction.
   - Empress Beef Suya Croquettes (₦16,500 for 12): Crispy potato croquettes enclosing a molten core of smoked beef suya and mozzarella cheese.
   - Golden Awara Honey-Glazed Rounds (₦9,000 for 15): Fresh pan-fried soy tofu slices drizzled with Kano forest wild honey and toasted sesame.
   - Traditional Gurasa Bandabanzu Bites (₦12,500 for 15): Mini rounds of soft tandoor-baked northern flatbread soaked in smoky peanut paste (kullun kada) and garden eggs (gauta).
   - Royal Alkaki Sweet Wheaten Twists (₦8,500 for 20): Deep copper wheat twigs soaked in tamarind and cane sugar syrup with pure ghee.

3. ENGLISH HIGH-TEA CLASSICS:
   - Gilded Cumberland Sausage Rolls (₦14,500 for 12): Flaky French puff pastry wrapping seasoned chicken sausage, brushed with saffron egg-wash and gold sesame.
   - Imperial Scotch Quail Eggs (₦16,000 for 12): Soft-boiled quail eggs wrapped in herby beef mince and crisp panko crumbs.
   - High-Tea Cucumber Dill Bites (₦11,500 for 16): Crustless brioche sandwiches with paper-thin cucumbers, cream cheese, baby dill, and lemon zest.
   - Mini Beef Wellington Parcels (₦28,000 for 8): Seared prime beef tenderloin with wild mushroom duxelles, herbed crepes, and golden puff pastry.
   - Also: Yorkshire Roast Beef with Horseradish (₦22,000 for 12), Sovereign Smoked Salmon Canapés (₦26,000 for 12), and Scones with imported Devonian Clotted Cream & strawberry jam (₦14,000 for 8).

4. DECADENT DESSERTS & DRINKS:
   - Velvet Gold Crimson Slices (₦22,000 for slab of 6): Red velvet sponge layers with Madagascar vanilla bean frosting, finished with authentic 24K edible gold flakes.
   - Salted Caramel Toffee Cups (₦16,000 for 8): Medjool date sponge cups drenched in salted caramel and praline dust.
   - Sovereign Tres Leches Milk Cake (₦4,500): Luxury milk-soaked sponge cake in evaporated, condensed, and heavy cream.
   - Zainab's Hibiscus Elderflower Zobo (₦4,500 per bottle / ₦45,000 for 10L dispenser): Hand-picked organic hibiscus, fresh pineapples, crushed ginger, and luxury elderflower essence.
   - Ginger Passionfruit Palmwine Elixir (₦6,500): Sparkling non-alcoholic palmwine blend with passionfruit pulp and pressed key lime.

CATERING PACKAGES & PLANNING RATES:
If customers are looking to throw a grand wedding, corporate gala, or family reunion, explain these highly cost-effective yet premium tiers perfectly:
1. Majestic Royal Wedding (₦5,500 per guest) - Gold-trimmed uniform servers, handcrafted Gizdodo cups, unlimited elderflower hibiscus Zobo barrels.
2. Elite Birthday Gala (₦4,200 per guest) - House-grilled Asun spears, sticky-dates puddings, golden calligraphy flags.
3. Executive Boardroom & Pitch Suite (₦6,500 per guest) - Individual high-end eco-lux boxed snacks, gourmet wraps, cold pressed ginger passion drinks, direct company invoicing.
4. Graduation & Reunion Celebration (₦3,500 per guest) - Cinnamon sweet puffs, mini sausage pastry envelopes, high-energy finger bites.

LOGISTICS & OPERATIONS:
- Head Kitchen Address: House No. 14, Janbulo First Gate (near BUK old gate entrance), Gwale LGA, Kano.
- Delivery options: Active, state-wide thermal locked temperature chest delivery across ALL of Kano State. We also deliver premium orders to Brasília, Asokoro, Maitama, and other elite areas in Abuja via specialized climate corridor transport.
- Spice Limits: You can masterfully customize plates into: "Mild Gwale" (subtle and deep spices), "Medium Gwale" (authentic local warmth), and "Standard Hot Kano-Style" (pure, traditional fiery passion).
- Pre-booking: Recommended 14 days for massive destination events, but we fulfill custom party trays and boxed orders with 24-48 hours notice.

You must respond as a JSON object with this exact structure (do not include any other markdown text around it, just raw JSON or a markdown JSON codeblock):
{
  "reply": "Your warm conversational reply text from Chef Zainab, written in first-person ('I')",
  "chips": ["Suggestive option 1", "Suggestive option 2"],
  "autoUpdate": {
    "eventType": "Wedding" | "Birthday" | "Corporate" | "Graduation" | null,
    "guestCount": number | null,
    "specialRequests": "dietary/spiciness request text if they mentioned any" | null,
    "action": "scroll_to_form" | "pre_fill" | null
  }
}

Guidelines for JSON fields:
- "reply": The message Zainab speaks in response to the user. Describe our menus in beautiful, high-end sensory descriptions. If they ask about Dan Wake, mention bean-flour dumplings and quail eggs. If they ask about Red Velvet, highlight the 24K edible gold flakes. Keep it elegant, luxurious, and highly comforting (mostly 2 to 4 sentences).
- "chips": Provide 2-3 interactive reply choices for the user's ease. Make them short & contextually sound (e.g. "Tell me about Dan Wake", "Explain 24K Red Velvet", "What is Gwale Spice?").
- "autoUpdate": Complete this if you detect the user's intent to set, change or ask about values.
  - Set "eventType" to "Wedding", "Birthday", "Corporate", or "Graduation" if they specify an event type or request one of these.
  - Set "guestCount" to a number if they specify how many guests they are hosting or want to calculate for.
  - Set "specialRequests" if they mention spices, allergies, or Custom Spicing.
  - Set "action" to "scroll_to_form" if they ask to pre-fill, fill, book, schedule, submit the form, or scroll down. Set to "pre_fill" if they explicitly say to auto-fill.
- If they do not specify changes, return null for those autoUpdate attributes.
`.trim();

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: geminiContents,
        config: {
          systemInstruction: systemInstruction,
          responseMimeType: "application/json",
          temperature: 0.75,
        }
      });

      const rawText = response.text || "{}";
      res.json(JSON.parse(rawText));
    } catch (error: any) {
      console.error("Chef server chat crash:", error);
      res.status(500).json({ error: error.message || "Something went wrong in Zainab's parlor." });
    }
  });

  // Automated Email Invoicing Pipeline with attached high-fidelity PDF invoice
  app.post("/api/send-order-email", async (req, res) => {
    try {
      const { order, pdfBase64 } = req.body;
      if (!order) {
        res.status(400).json({ error: "Missing order metadata package" });
        return;
      }

      const customerEmail = order.customerEmail || "lohochris@gmail.com";
      const customerName = order.customerName || "Patron";

      // Initialize transparent mail delivery gateways
      let transporter;
      let etherealUrl = "";

      const smtpHost = process.env.SMTP_HOST;
      const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const smtpFrom = process.env.SMTP_FROM || '"Small Chops by Aqeelah" <kitchen@aqeelah.com>';

      if (smtpHost && smtpUser && smtpPass) {
        console.log("Secure custom SMTP server handshake authenticated successfully.");
        transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass
          }
        });
      } else {
        console.log("No default SMTP host environment coordinates found. Registering safe dynamic sandbox via Ethereal Mail Nodes...");
        const testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass
          }
        });
      }

      // Generate HTML row markup from items purchased
      const orderItemsHtml = order.items.map((item: any) => {
        const numericPart = parseInt(item.selectedPortion.match(/\d+/)?.[0] || '12');
        const factor = numericPart > 12 ? (numericPart / 12) : 1;
        const itemPrice = item.product.price * (factor >= 1 ? Math.floor(factor) : 1);
        const itemTotal = itemPrice * item.quantity;
        return `
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px; font-size: 13px; color: #1e293b; font-family: sans-serif;">
              <strong style="color: #052e16;">${item.product.name}</strong>
              <div style="font-size: 10px; color: #64748b; margin-top: 2px;">Portion: ${item.selectedPortion}</div>
            </td>
            <td style="padding: 12px; font-size: 13px; color: #1e293b; text-align: center; font-family: sans-serif;">${item.quantity}</td>
            <td style="padding: 12px; font-size: 13px; color: #1e293b; text-align: right; font-family: sans-serif;">₦${itemPrice.toLocaleString()}</td>
            <td style="padding: 12px; font-size: 13px; color: #052e16; text-align: right; font-weight: bold; font-family: sans-serif;">₦${itemTotal.toLocaleString()}</td>
          </tr>
        `;
      }).join("");

      // Beautiful dark-emerald brand cohesive HTML design template
      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your Secure Order Invoice - Small Chops by Aqeelah</title>
        </head>
        <body style="font-family: 'Georgia', 'Times New Roman', serif; background-color: #f8f6f2; margin: 0; padding: 20px; color: #1e293b; -webkit-font-smoothing: antialiased;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid rgba(212, 175, 55, 0.3); box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);">
            
            <!-- Company Gilded Header Hero -->
            <div style="background-color: #052e16; padding: 35px 20px; text-align: center; border-bottom: 3px solid #d4af37; background-image: linear-gradient(135deg, #052e16 0%, #021a0c 100%);">
              <h1 style="color: #fdfbf7; margin: 0; font-size: 22px; font-weight: bold; letter-spacing: 2.5px; text-transform: uppercase;">SMALL CHOPS BY AQEELAH</h1>
              <div style="color: #d4af37; margin: 6px 0 0 0; font-size: 9px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; letter-spacing: 1.5px; font-weight: bold; text-transform: uppercase;">MODERN AFRICAN LUXURY — KANO STATE, NIGERIA</div>
            </div>

            <!-- Content Area -->
            <div style="padding: 30px; font-family: system-ui, -apple-system, sans-serif;">
              
              <div style="text-align: center; margin-bottom: 25px;">
                <span style="background-color: rgba(5, 46, 22, 0.08); color: #052e16; padding: 6px 14px; border-radius: 30px; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; border: 1px solid rgba(5,46,22,0.15)">
                  ⚡ SECURED PAYMENT CONFIRMED
                </span>
                <h2 style="color: #052e16; font-family: 'Georgia', serif; font-size: 21px; margin: 15px 0 5px 0; font-weight: bold;">Order Registered Successfully</h2>
                <p style="color: #64748b; font-size: 12px; margin: 0;">Order Reference Tag: <strong>${order.id}</strong> • Transacted on ${order.date}</p>
              </div>

              <p style="font-size: 14px; color: #334155; line-height: 1.5;">Salutations, <strong style="color: #052e16;">Esteemed Patron ${customerName}</strong>,</p>
              <p style="font-size: 14px; color: #334155; line-height: 1.5; margin-bottom: 25px;">We have securely cleared your payment via ${order.paymentMethod}. Our culinary kitchen is already buzzing with excitement to prepare, fresh temperature lock-seal, and deliver your hand-rolled small chops collection directly to your doorstep.</p>

              <!-- Personalized Chef Thank-You Note card -->
              <div style="margin: 28px 0; padding: 22px; background-color: #fdfbf7; border-left: 4px solid #d4af37; border-radius: 0 16px 16px 0; border-top: 1px solid #f1f0ec; border-right: 1px solid #f1f0ec; border-bottom: 1px solid #f1f0ec; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);">
                <h4 style="color: #052e16; font-family: 'Georgia', serif; margin: 0 0 10px 0; font-size: 14px; font-weight: bold; letter-spacing: 0.5px; text-transform: uppercase;">A Personal Note from Chef Zainab Bello Sule</h4>
                <p style="font-family: 'Georgia', 'Times New Roman', serif; font-style: italic; color: #44403c; margin: 0; font-size: 13.5px; line-height: 1.6;">
                  "Masha Allah, my dear friend ${customerName}! I am deeply excited and honored to craft this exquisite selection of gourmet bites for your dining pleasure. Each crispy samosa, delicious savory dambun nama cup, and spicy high-tea canapé departing our Kitchen Gate is wrapped with authentic Kano culture and high-grade ingredients of Northern Nigerian victory. Rest assured we are orchestrating our absolute finest for your celebration!"
                </p>
                <div style="margin-top: 15px; display: flex; align-items: center;">
                  <div>
                    <p style="font-family: 'Georgia', serif; color: #d4af37; font-weight: bold; margin: 0; font-size: 13px;">Chef Zainab Bello Sule</p>
                    <p style="margin: 1px 0 0 0; font-size: 10px; color: #78716c; text-transform: uppercase; letter-spacing: 0.5px;">Executive Chef & Visionary Founder</p>
                  </div>
                </div>
              </div>

              <!-- Invoice details -->
              <h3 style="color: #052e16; font-family: 'Georgia', serif; font-size: 15px; font-weight: bold; border-bottom: 1.5px solid rgba(212, 175, 55, 0.3); padding-bottom: 8px; margin: 30px 0 12px 0; text-transform: uppercase; letter-spacing: 0.5px;">Purchased Delicacies</h3>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
                <thead>
                  <tr style="background-color: #f8fafc; border-bottom: 2px solid #e2e8f0;">
                    <th style="padding: 10px; text-align: left; font-size: 11px; font-weight: bold; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; font-family: sans-serif;">Item Detail</th>
                    <th style="padding: 10px; text-align: center; font-size: 11px; font-weight: bold; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; font-family: sans-serif;">Qty</th>
                    <th style="padding: 10px; text-align: right; font-size: 11px; font-weight: bold; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; font-family: sans-serif;">Rate</th>
                    <th style="padding: 10px; text-align: right; font-size: 11px; font-weight: bold; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; font-family: sans-serif;">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${orderItemsHtml}
                </tbody>
              </table>

              <!-- Financial Box -->
              <div style="background-color: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 25px;">
                <table style="width: 100%; font-size: 13px; color: #475569; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 5px 0; font-family: sans-serif;">Subtotal Amount:</td>
                    <td style="padding: 5px 0; text-align: right; font-weight: bold; color: #1e293b; font-family: sans-serif;">₦${order.subtotal.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 0; color: #e11d48; font-family: sans-serif;">Special Loyal Reward (10% Off):</td>
                    <td style="padding: 5px 0; text-align: right; font-weight: bold; color: #e11d48; font-family: sans-serif;">-₦${order.discount.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 0; font-family: sans-serif;">Climate Insulated Shipping:</td>
                    <td style="padding: 5px 0; text-align: right; font-weight: bold; color: #1e293b; font-family: sans-serif;">₦${order.deliveryFee.toLocaleString()}</td>
                  </tr>
                  <tr style="font-size: 15px; color: #052e16;">
                    <td style="padding: 12px 0 0 0; font-weight: bold; border-top: 1.5px dashed #e2e8f0; font-family: sans-serif;">GRAND TOTAL SECURED:</td>
                    <td style="padding: 12px 0 0 0; text-align: right; font-weight: bold; border-top: 1.5px dashed #e2e8f0; color: #052e16; font-size: 16px; font-family: sans-serif;">₦${order.total.toLocaleString()}</td>
                  </tr>
                </table>
              </div>

              <!-- Dispatch Logistics Summary -->
              <div style="padding: 15px; border: 1px dashed rgba(5, 46, 22, 0.25); border-radius: 10px; font-size: 12px; color: #475569; background-color: rgba(5,46,22,0.01); font-family: sans-serif; line-height: 1.5;">
                <div style="font-weight: bold; color: #052e16; margin-bottom: 4px; text-transform: uppercase; font-size: 10px; letter-spacing: 0.5px;">Climate Locked Delivery Coordinate</div>
                ${order.deliveryAddress}
              </div>

              <p style="font-size: 11px; color: #64748b; text-align: center; margin-top: 30px; font-family: sans-serif; line-height: 1.4;">
                * A printable, high-fidelity PDF invoice card has been compiled dynamically and attached directly to this receipt message. We look forward to nourishing your celebrations.
              </p>

            </div>

            <!-- Custom footer banner -->
            <div style="background-color: #f1f5f9; padding: 25px; text-align: center; border-top: 1px solid #e2e8f0; font-family: sans-serif;">
              <p style="margin: 0; font-size: 11px; color: #475569; font-weight: 500;">Chef Headquarters: House No. 14, Janbulo First Gate, Gwale LGA, Kano State, Nigeria</p>
              <p style="margin: 6px 0 0 0; font-size: 11px; color: #64748b;">Direct kitchen concierge coordinates: <a href="mailto:chef.zainab@aqeelah.com" style="color: #052e16; font-weight: bold; text-decoration: none;">chef.zainab@aqeelah.com</a></p>
            </div>

          </div>
        </body>
        </html>
      `;

      // Set up the full email options packet
      const mailOptions: any = {
        from: smtpFrom,
        to: customerEmail,
        subject: `📜 Verified Order Invoice ${order.id} - Small Chops by Aqeelah`,
        html: emailHtml,
        attachments: []
      };

      if (pdfBase64) {
        let cleanBase64 = pdfBase64;
        if (pdfBase64.startsWith("data:")) {
          const parts = pdfBase64.split(";base64,");
          cleanBase64 = parts[parts.length - 1];
        }

        mailOptions.attachments.push({
          filename: `Aqeelah_Invoice_${order.id}.pdf`,
          content: cleanBase64,
          encoding: 'base64',
          contentType: 'application/pdf'
        });
      }

      const info = await transporter.sendMail(mailOptions);
      console.log("Invoice dispatched dynamically. Node Response ID:", info.messageId);

      let previewUrl = "";
      if (!smtpHost) {
        const testUrl = nodemailer.getTestMessageUrl(info);
        previewUrl = testUrl ? testUrl : "";
        console.log("Ethereal test mailbox portal available at link:", previewUrl);
      }

      res.json({
        success: true,
        messageId: info.messageId,
        previewUrl: previewUrl || null
      });

    } catch (err: any) {
      console.error("Order payment message dispatch crash:", err);
      res.status(500).json({ error: err.message || "Failed to dispatch invoice receipt" });
    }
  });

  // Serve static files / Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Chef Server active and serving on http://localhost:${PORT}`);
  });
}

startServer();
