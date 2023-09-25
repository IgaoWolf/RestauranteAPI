--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9 (Ubuntu 14.9-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.9 (Ubuntu 14.9-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: clientes; Type: TABLE; Schema: public; Owner: apires
--

CREATE TABLE public.clientes (
    id integer NOT NULL,
    nome character varying(255) NOT NULL,
    email character varying(255),
    telefone character varying(15),
    endereco text
);


ALTER TABLE public.clientes OWNER TO apires;

--
-- Name: clientes_id_seq; Type: SEQUENCE; Schema: public; Owner: apires
--

CREATE SEQUENCE public.clientes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.clientes_id_seq OWNER TO apires;

--
-- Name: clientes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: apires
--

ALTER SEQUENCE public.clientes_id_seq OWNED BY public.clientes.id;


--
-- Name: contas; Type: TABLE; Schema: public; Owner: apires
--

CREATE TABLE public.contas (
    id integer NOT NULL,
    pedido_id integer,
    numero_pessoas integer NOT NULL,
    valor_total numeric(10,2) NOT NULL,
    fechada boolean DEFAULT false
);


ALTER TABLE public.contas OWNER TO apires;

--
-- Name: contas_id_seq; Type: SEQUENCE; Schema: public; Owner: apires
--

CREATE SEQUENCE public.contas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contas_id_seq OWNER TO apires;

--
-- Name: contas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: apires
--

ALTER SEQUENCE public.contas_id_seq OWNED BY public.contas.id;


--
-- Name: funcionarios; Type: TABLE; Schema: public; Owner: apires
--

CREATE TABLE public.funcionarios (
    id integer NOT NULL,
    nome character varying(255) NOT NULL,
    cargo character varying(255) NOT NULL,
    salario numeric(10,2) NOT NULL
);


ALTER TABLE public.funcionarios OWNER TO apires;

--
-- Name: funcionarios_id_seq; Type: SEQUENCE; Schema: public; Owner: apires
--

CREATE SEQUENCE public.funcionarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.funcionarios_id_seq OWNER TO apires;

--
-- Name: funcionarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: apires
--

ALTER SEQUENCE public.funcionarios_id_seq OWNED BY public.funcionarios.id;


--
-- Name: itens_pedido; Type: TABLE; Schema: public; Owner: apires
--

CREATE TABLE public.itens_pedido (
    id integer NOT NULL,
    pedido_id integer,
    produto_id integer,
    quantidade integer NOT NULL,
    valor_unitario numeric(10,2) NOT NULL
);


ALTER TABLE public.itens_pedido OWNER TO apires;

--
-- Name: itens_pedido_id_seq; Type: SEQUENCE; Schema: public; Owner: apires
--

CREATE SEQUENCE public.itens_pedido_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.itens_pedido_id_seq OWNER TO apires;

--
-- Name: itens_pedido_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: apires
--

ALTER SEQUENCE public.itens_pedido_id_seq OWNED BY public.itens_pedido.id;


--
-- Name: pagamentos; Type: TABLE; Schema: public; Owner: apires
--

CREATE TABLE public.pagamentos (
    id integer NOT NULL,
    pedido_id integer,
    metodo_pagamento character varying(255) NOT NULL,
    valor_pago numeric(10,2) NOT NULL,
    data_pagamento timestamp without time zone DEFAULT now()
);


ALTER TABLE public.pagamentos OWNER TO apires;

--
-- Name: pagamentos_id_seq; Type: SEQUENCE; Schema: public; Owner: apires
--

CREATE SEQUENCE public.pagamentos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pagamentos_id_seq OWNER TO apires;

--
-- Name: pagamentos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: apires
--

ALTER SEQUENCE public.pagamentos_id_seq OWNED BY public.pagamentos.id;


--
-- Name: pedidos; Type: TABLE; Schema: public; Owner: apires
--

CREATE TABLE public.pedidos (
    id integer NOT NULL,
    cliente_id integer,
    data_pedido timestamp without time zone DEFAULT now(),
    status_pedido character varying(20) DEFAULT 'Aberto'::character varying,
    mesa integer NOT NULL,
    valor_total numeric(10,2) NOT NULL
);


ALTER TABLE public.pedidos OWNER TO apires;

--
-- Name: pedidos_id_seq; Type: SEQUENCE; Schema: public; Owner: apires
--

CREATE SEQUENCE public.pedidos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pedidos_id_seq OWNER TO apires;

--
-- Name: pedidos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: apires
--

ALTER SEQUENCE public.pedidos_id_seq OWNED BY public.pedidos.id;


--
-- Name: produtos; Type: TABLE; Schema: public; Owner: apires
--

CREATE TABLE public.produtos (
    id integer NOT NULL,
    nome character varying(255) NOT NULL,
    descricao text,
    preco numeric(10,2) NOT NULL
);


ALTER TABLE public.produtos OWNER TO apires;

--
-- Name: produtos_id_seq; Type: SEQUENCE; Schema: public; Owner: apires
--

CREATE SEQUENCE public.produtos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.produtos_id_seq OWNER TO apires;

--
-- Name: produtos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: apires
--

ALTER SEQUENCE public.produtos_id_seq OWNED BY public.produtos.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: apires
--

CREATE TABLE public.users (
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO apires;

--
-- Name: clientes id; Type: DEFAULT; Schema: public; Owner: apires
--

ALTER TABLE ONLY public.clientes ALTER COLUMN id SET DEFAULT nextval('public.clientes_id_seq'::regclass);


--
-- Name: contas id; Type: DEFAULT; Schema: public; Owner: apires
--

ALTER TABLE ONLY public.contas ALTER COLUMN id SET DEFAULT nextval('public.contas_id_seq'::regclass);


--
-- Name: funcionarios id; Type: DEFAULT; Schema: public; Owner: apires
--

ALTER TABLE ONLY public.funcionarios ALTER COLUMN id SET DEFAULT nextval('public.funcionarios_id_seq'::regclass);


--
-- Name: itens_pedido id; Type: DEFAULT; Schema: public; Owner: apires
--

ALTER TABLE ONLY public.itens_pedido ALTER COLUMN id SET DEFAULT nextval('public.itens_pedido_id_seq'::regclass);


--
-- Name: pagamentos id; Type: DEFAULT; Schema: public; Owner: apires
--

ALTER TABLE ONLY public.pagamentos ALTER COLUMN id SET DEFAULT nextval('public.pagamentos_id_seq'::regclass);


--
-- Name: pedidos id; Type: DEFAULT; Schema: public; Owner: apires
--

ALTER TABLE ONLY public.pedidos ALTER COLUMN id SET DEFAULT nextval('public.pedidos_id_seq'::regclass);


--
-- Name: produtos id; Type: DEFAULT; Schema: public; Owner: apires
--

ALTER TABLE ONLY public.produtos ALTER COLUMN id SET DEFAULT nextval('public.produtos_id_seq'::regclass);


--
-- Data for Name: clientes; Type: TABLE DATA; Schema: public; Owner: apires
--

COPY public.clientes (id, nome, email, telefone, endereco) FROM stdin;
1	João Silva	joao.silva@example.com	(11) 1234-5678	Rua Exemplo, 123
\.


--
-- Data for Name: contas; Type: TABLE DATA; Schema: public; Owner: apires
--

COPY public.contas (id, pedido_id, numero_pessoas, valor_total, fechada) FROM stdin;
2	4	4	10.00	t
3	4	2	39.98	f
5	5	2	29.99	t
\.


--
-- Data for Name: funcionarios; Type: TABLE DATA; Schema: public; Owner: apires
--

COPY public.funcionarios (id, nome, cargo, salario) FROM stdin;
1	João Silva	Garçom	2500.00
\.


--
-- Data for Name: itens_pedido; Type: TABLE DATA; Schema: public; Owner: apires
--

COPY public.itens_pedido (id, pedido_id, produto_id, quantidade, valor_unitario) FROM stdin;
1	4	1	2	19.99
2	5	1	3	19.99
\.


--
-- Data for Name: pagamentos; Type: TABLE DATA; Schema: public; Owner: apires
--

COPY public.pagamentos (id, pedido_id, metodo_pagamento, valor_pago, data_pagamento) FROM stdin;
\.


--
-- Data for Name: pedidos; Type: TABLE DATA; Schema: public; Owner: apires
--

COPY public.pedidos (id, cliente_id, data_pedido, status_pedido, mesa, valor_total) FROM stdin;
4	1	2023-09-20 02:20:44.366155	Aberto	4	0.00
5	1	2023-09-20 03:16:54.843261	Aberto	4	0.00
\.


--
-- Data for Name: produtos; Type: TABLE DATA; Schema: public; Owner: apires
--

COPY public.produtos (id, nome, descricao, preco) FROM stdin;
1	Produto de Teste	Descrição do Produto de Teste	19.99
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: apires
--

COPY public.users (username, password) FROM stdin;
igor	igor
\.


--
-- Name: clientes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: apires
--

SELECT pg_catalog.setval('public.clientes_id_seq', 1, true);


--
-- Name: contas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: apires
--

SELECT pg_catalog.setval('public.contas_id_seq', 5, true);


--
-- Name: funcionarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: apires
--

SELECT pg_catalog.setval('public.funcionarios_id_seq', 2, true);


--
-- Name: itens_pedido_id_seq; Type: SEQUENCE SET; Schema: public; Owner: apires
--

SELECT pg_catalog.setval('public.itens_pedido_id_seq', 2, true);


--
-- Name: pagamentos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: apires
--

SELECT pg_catalog.setval('public.pagamentos_id_seq', 1, false);


--
-- Name: pedidos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: apires
--

SELECT pg_catalog.setval('public.pedidos_id_seq', 5, true);


--
-- Name: produtos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: apires
--

SELECT pg_catalog.setval('public.produtos_id_seq', 1, true);


--
-- Name: clientes clientes_email_key; Type: CONSTRAINT; Schema: public; Owner: apires
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_email_key UNIQUE (email);


--
-- Name: clientes clientes_pkey; Type: CONSTRAINT; Schema: public; Owner: apires
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_pkey PRIMARY KEY (id);


--
-- Name: contas contas_pkey; Type: CONSTRAINT; Schema: public; Owner: apires
--

ALTER TABLE ONLY public.contas
    ADD CONSTRAINT contas_pkey PRIMARY KEY (id);


--
-- Name: funcionarios funcionarios_pkey; Type: CONSTRAINT; Schema: public; Owner: apires
--

ALTER TABLE ONLY public.funcionarios
    ADD CONSTRAINT funcionarios_pkey PRIMARY KEY (id);


--
-- Name: itens_pedido itens_pedido_pkey; Type: CONSTRAINT; Schema: public; Owner: apires
--

ALTER TABLE ONLY public.itens_pedido
    ADD CONSTRAINT itens_pedido_pkey PRIMARY KEY (id);


--
-- Name: pagamentos pagamentos_pkey; Type: CONSTRAINT; Schema: public; Owner: apires
--

ALTER TABLE ONLY public.pagamentos
    ADD CONSTRAINT pagamentos_pkey PRIMARY KEY (id);


--
-- Name: pedidos pedidos_pkey; Type: CONSTRAINT; Schema: public; Owner: apires
--

ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT pedidos_pkey PRIMARY KEY (id);


--
-- Name: produtos produtos_pkey; Type: CONSTRAINT; Schema: public; Owner: apires
--

ALTER TABLE ONLY public.produtos
    ADD CONSTRAINT produtos_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: apires
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (username);


--
-- Name: contas contas_pedido_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: apires
--

ALTER TABLE ONLY public.contas
    ADD CONSTRAINT contas_pedido_id_fkey FOREIGN KEY (pedido_id) REFERENCES public.pedidos(id);


--
-- Name: itens_pedido itens_pedido_pedido_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: apires
--

ALTER TABLE ONLY public.itens_pedido
    ADD CONSTRAINT itens_pedido_pedido_id_fkey FOREIGN KEY (pedido_id) REFERENCES public.pedidos(id);


--
-- Name: itens_pedido itens_pedido_produto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: apires
--

ALTER TABLE ONLY public.itens_pedido
    ADD CONSTRAINT itens_pedido_produto_id_fkey FOREIGN KEY (produto_id) REFERENCES public.produtos(id);


--
-- Name: pagamentos pagamentos_pedido_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: apires
--

ALTER TABLE ONLY public.pagamentos
    ADD CONSTRAINT pagamentos_pedido_id_fkey FOREIGN KEY (pedido_id) REFERENCES public.pedidos(id);


--
-- Name: pedidos pedidos_cliente_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: apires
--

ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT pedidos_cliente_id_fkey FOREIGN KEY (cliente_id) REFERENCES public.clientes(id);


--
-- PostgreSQL database dump complete
--

