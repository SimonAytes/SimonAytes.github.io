---
title: "Unified Multimodal Demonstration Retrieval for In-Context Learning in Large Vision-Language Models"
collection: publications
category: conferences
permalink: /publication/2024-aura
excerpt: 'We propose AURA, a task-agnostic framework that enhances multimodal in-context learning by dynamically retrieving and aligning relevant text and visual data. Through a unified embedding space and VLM-guided feedback, AURA improves performance on tasks like VQA and sentiment analysis, demonstrating adaptability and precision across diverse benchmarks.'
date: 2024-11-26
venue: 'ArXiV'
# slidesurl: 'http://academicpages.github.io/files/slides1.pdf'
paperurl: '/files/arxiv_AURA_Preprint.pdf'
# citation: 'Aytes, Simon A., Baek, Jinheon, & Hwang, Sung Ju. (2024). "Unified Multimodal Demonstration Retrieval for In-Context Learning in Large Vision-Language Models." <i>arXiv preprint</i>, arXiv:xxxx.xxxxx.'
citation: '<b>Aytes, Simon A.</b>, Baek, Jinheon, & Hwang, Sung Ju. (2024). "Unified Multimodal Demonstration Retrieval for In-Context Learning in Large Vision-Language Models." <i>Preprint.</i>'
---

In-context learning (ICL) is a paradigm that enables models to make predictions based on examples provided within the input context, showing substantial promise for adapting vision-language models (VLMs) to diverse tasks without fine-tuning. However, extending ICL to multimodal settings—where models must dynamically retrieve and align both text and visual data—presents significant challenges. Existing ICL methods often rely on pre-defined (static) demonstrations and are primarily limited to unimodal text retrieval, reducing their adaptability and effectiveness in complex multimodal scenarios. We propose <b>AURA</b> (Adaptive Unified Retrieval and Alignment), a novel task-agnostic retrieval framework that enhances multimodal ICL by learning to retrieve and align relevant demonstrations across both unimodal and multimodal datasets. AURA operates within a unified multimodal embedding space structured through contrastive triplet learning, allowing it to dynamically adapt retrievals based on the task at hand. Furthermore, a VLM-guided feedback mechanism fine-tunes retrieval relevance and alignment, enabling AURA to respond effectively to varied task requirements. Experimental results across a broad range of vision-language benchmarks, including Visual Question Answering (VQA) and multimodal sentiment analysis, demonstrate that AURA not only improves retrieval precision and VLM response accuracy but also generalizes across disparate datasets, establishing a versatile framework for advancing multimodal in-context learning across varied tasks.