export interface HandbookSection {
  id: string;
  title: string;
  subtitle?: string;
  asciiDiagram?: string;
  content: string[];
  subsections?: {
    title: string;
    points: string[];
    code?: string;
  }[];
  alertBox?: {
    type: 'important' | 'note';
    title: string;
    text: string;
  };
}

export interface HandbookQuestion {
  id: number;
  question: string;
  category: 'Kubernetes' | 'Linux & Containers' | 'Infrastructure as Code' | 'CI/CD & Git' | 'Cloud & Networking' | 'SRE & Observability';
  summary: string;
  asciiDiagram?: string;
  steps: {
    title: string;
    details: string;
  }[];
  codeSnippet?: string;
  proTip?: string;
}

export const HANDBOOK_META = {
  title: "The Complete DevOps, SRE & Cloud Infrastructure Handbook",
  subtitle: "From Bare-Metal Silicon to Cloud Native Systems & Low-Level Internals",
  author: "Aditya Manoj",
  badge: "Engineering Reference & Architecture Guide",
  abstract: "This handbook provides a complete systems engineering reference covering modern infrastructure across two exhaustive parts. Part I establishes foundational architecture: physical server provisioning, Out-of-Band management (IPMI/iDRAC/iLO), Cisco networking, Linux distributions (Ubuntu vs. SUSE), 3-node quorum high availability, GPU cluster acceleration, Kubernetes control plane architecture, deployment topologies, multi-cloud comparisons (AWS, Azure, GCP), Site Reliability Engineering (SRE) metrics, and the Prometheus-Loki-Grafana observability stack. Part II provides low-level systems breakdowns for 20 rigorous technical interview questions, dissecting Linux kernel primitives (clone, namespaces, cgroups, OverlayFS), Kubernetes controller loops, data planes (iptables, IPVS, eBPF), Terraform Directed Acyclic Graph (DAG) state locking, and incident troubleshooting frameworks."
};

export const HANDBOOK_FOUNDATIONS: HandbookSection[] = [
  {
    id: "mental-model",
    title: "The Mental Model: The Modern Infrastructure Stack",
    content: [
      "Modern production environments operate as an interconnected hierarchy of abstractions. A failure at any single layer cascades upward unless mitigated by architectural redundancy at every tier."
    ],
    asciiDiagram: `+------------------------------------------------------------------------+
|                        OBSERVABILITY & SRE                             |
|       Prometheus (Metrics)  |  Loki (Logs)  |  Grafana (Dashboards)    |
|                 SLIs / SLOs / Error Budgets / Runbooks                 |
+-----------------------------------T------------------------------------+
                                    |
+-----------------------------------v------------------------------------+
|                    CLOUD & ORCHESTRATION LAYER                         |
|       Kubernetes (K8s)  |  AWS / Azure / GCP  |  IaC (Terraform/Helm)  |
|             Rolling / Canary / Blue-Green Deployments & HPA            |
+-----------------------------------T------------------------------------+
                                    |
+-----------------------------------v------------------------------------+
|                  OPERATING SYSTEMS & COMPUTE LAYER                     |
|         Ubuntu / SUSE  |  GPU Acceleration (CUDA / Containers)         |
|          3-Node High Availability (HA Quorum / Failover)               |
+-----------------------------------T------------------------------------+
                                    |
+-----------------------------------v------------------------------------+
|                  PHYSICAL INFRASTRUCTURE & NETWORK                     |
|        On-Prem Servers (IPMI/BIOS) | Cisco Switches & Routing (VLANs)  |
+------------------------------------------------------------------------+`
  },
  {
    id: "on-prem-hardware",
    title: "On-Premises Hardware & Physical Server Configuration",
    content: [
      "Bare-metal infrastructure requires rigorous out-of-band management, storage redundancy, and BIOS optimization to guarantee deterministic execution and high availability."
    ],
    subsections: [
      {
        title: "Out-of-Band Management (OOB / BMC)",
        points: [
          "Dell iDRAC / HPE iLO: Dedicated Baseboard Management Controllers with independent microprocessors and network ports. Enable remote virtual KVM, remote ISO mounting, real-time thermal telemetry, fan curves, and hard power-cycling independent of the OS.",
          "IPMI (Intelligent Platform Management Interface): Neutral CLI protocol for programmatic BMC automation via ipmitool."
        ]
      },
      {
        title: "Storage & RAID Topologies",
        points: [
          "Hardware RAID (BBU Write Cache): RAID 1 (Mirroring - 50% capacity, high fault tolerance), RAID 5/6 (Distributed parity across 3+ or 4+ drives, withstanding 1-2 drive losses), and RAID 10 (Striped mirrors blending RAID 0 speed with RAID 1 redundancy).",
          "Software Defined Storage (ZFS / mdadm): Host Bus Adapters (HBAs) flashed to IT Mode pass raw drives directly to the OS for cryptographic scrub verification, copy-on-write snapshots, and automated silent bit-rot repair."
        ]
      },
      {
        title: "BIOS / UEFI Performance Tuning",
        points: [
          "C-States & Power Profiles: Disable deep CPU sleep states (C6/C1E) and enforce Static High Performance to eliminate CPU frequency scaling latency jitter in clustered workloads.",
          "Virtualization & Passthrough: Enable Intel VT-x / AMD-V and IOMMU (Intel VT-d / AMD-Vi) for direct PCIe device passthrough (e.g. dedicated GPUs directly into guest VMs or containers)."
        ]
      }
    ]
  },
  {
    id: "cisco-networking",
    title: "Cisco & Physical Networking Foundations",
    content: [
      "Network segmentation and link redundancy are the backbone of resilient multi-node clusters and secure data centers."
    ],
    asciiDiagram: `                      Layer 3 Gateway (Router / Firewall)
                                   |
                      Trunk Link (802.1Q Tagged)
                                   |
                     +-------------v-------------+
                     |    Cisco Catalyst Switch  |
                     +------T-------------T------+
       VLAN 10 (Access Port)|             |VLAN 20 (Access Port)
              +-------------v---+     +---v-------------+
              | Management/IPMI |     | Kubernetes Pods |
              | 192.168.10.0/24 |     | 192.168.20.0/24 |
              +-----------------+     +-----------------+`,
    subsections: [
      {
        title: "Layer 2 Switching vs. Layer 3 Routing",
        points: [
          "Layer 2 (Data Link): Forwards Ethernet frames based on hardware MAC addresses within a single broadcast domain.",
          "Layer 3 (Network): Routes IP packets between distinct subnets and VLANs using routing tables and gateways."
        ]
      },
      {
        title: "VLANs & 802.1Q Trunking",
        points: [
          "VLANs: Partition a single physical switch into multiple isolated broadcast domains (VLAN 10 for IPMI/BMC, VLAN 20 for Ceph storage replication, VLAN 30 for Kubernetes node peering).",
          "Access vs Trunk Ports: Access ports connect directly to servers for untagged frames; Trunk ports connect switches and hypervisors, encapsulating packets with an 802.1Q header tag with a 12-bit VLAN identifier.",
          "LACP (802.3ad Link Aggregation): Aggregates multiple physical Ethernet cables into a single high-bandwidth, redundant logical interface (EtherChannel/Bonding)."
        ]
      }
    ]
  },
  {
    id: "linux-distros",
    title: "Operating Systems: Ubuntu vs. SUSE",
    content: [
      "Choosing an enterprise distribution dictates package management, lifecycle stability, and cluster maintenance workflows."
    ],
    subsections: [
      {
        title: "Ubuntu (Debian) vs. SUSE (RPM)",
        points: [
          "Package Management: Ubuntu uses apt/dpkg; SUSE uses zypper/rpm.",
          "Enterprise Editions: Ubuntu Server LTS (Canonical) vs. SLES (SUSE Linux Enterprise Server).",
          "Immutable / K8s Focus: Ubuntu Core vs. openSUSE MicroOS / SLE Micro.",
          "Admin Tooling: Ubuntu Netplan / CLI-first vs. SUSE YaST (Yet another Setup Tool) CLI & GUI.",
          "Enterprise Footprint: Ubuntu dominates public cloud & AI/ML pipelines; SUSE leads European banking & SAP enterprise environments."
        ]
      },
      {
        title: "Production Server Hardening Baseline",
        points: [
          "Enforce SSH Key-only authentication, disable root login (PermitRootLogin no), restrict MaxAuthTries to 3.",
          "Default-drop ingress firewall policies via ufw (Ubuntu) or firewalld (SUSE), whitelisting only designated subnets.",
          "Automated cloud-init provisioning for disk mounting, user creation, and SSH key placement."
        ],
        code: `PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
X11Forwarding no
MaxAuthTries 3`
      }
    ]
  },
  {
    id: "high-availability",
    title: "High Availability Architecture: 3-PC Fallback / Quorum Cluster",
    content: [
      "Quorum-based clustering eliminates catastrophic split-brain conditions that occur when nodes lose network connectivity while still running."
    ],
    alertBox: {
      type: "important",
      title: "Why Simple '1 Active + 2 Standbys' Fails:",
      text: "If Node 1 drops network connectivity while running, Node 2 & 3 both assume it has died and simultaneously attempt to claim leadership. This creates a Split-Brain condition with concurrent writes and state corruption. Production clusters require an odd number of nodes (3, 5, 7) to enforce mathematical quorum: Quorum = floor(N/2) + 1. In a 3-node cluster, at least 2 votes are required."
    },
    asciiDiagram: `                 Virtual IP (VIP): 192.168.1.100
                               |
               +---------------v---------------+
               |                               |
       +-------v-------+               +-------v-------+
       |     PC 1      | <---Keepalive/|     PC 2      |
       | (Active Leader)|     Heartbeat |   (Standby)   |
       +-------T-------+ ------------->+-------T-------+
               |                               |
               |         +-------------+       |
               +-------->|    PC 3     |<------+
                         |  (Standby/  |
                         |   Quorum)   |
                         +-------------+`,
    subsections: [
      {
        title: "HA Implementation Strategy",
        points: [
          "Network Failover (Keepalived & VRRP): A Virtual IP (VIP) floats across the physical machines. If PC 1 stops broadcasting heartbeats, PC 2 and PC 3 elect a new master based on configured priority weights within milliseconds.",
          "Control-Plane HA (k3s / Lightweight K8s): 3-node HA Kubernetes control plane backed by embedded etcd running Raft consensus. Any single machine can fail with zero data loss or downtime.",
          "Replicated Block Storage (Ceph / Longhorn / DRBD): Storage replicates blocks synchronously over the local network, ensuring stateful application data remains immediately accessible to any active node."
        ]
      }
    ]
  },
  {
    id: "gpu-acceleration",
    title: "GPU Server Setup & Acceleration Stack",
    content: [
      "Accelerating AI/ML workloads requires precise hardware power delivery, PCIe bus bandwidth, kernel drivers, and container toolkit hooks."
    ],
    asciiDiagram: `+--------------------------------------------------------+
|                   Containers / Models                  |
|             PyTorch / vLLM / Ollama / Triton           |
+--------------------------------------------------------+
|           NVIDIA Container Toolkit (nvidia-ctk)        |
+--------------------------------------------------------+
|                     CUDA Toolkit                       |
+--------------------------------------------------------+
|               NVIDIA Proprietary Driver                |
+--------------------------------------------------------+
|           Physical GPU Hardware (PCIe / Power)         |
+--------------------------------------------------------+`,
    subsections: [
      {
        title: "Hardware Deployment Prerequisites",
        points: [
          "Dedicated 8-pin or native 12VHPWR PCIe rails directly from a server-grade PSU (avoiding daisy-chained splitters).",
          "Full physical PCIe 4.0/5.0 x16 throughput without motherboard bifurcation lane-sharing downgrades.",
          "Chassis front-to-back pressurized airflow for enterprise blower-style GPUs."
        ]
      },
      {
        title: "Software Stack Configuration",
        points: [
          "Disable nouveau driver and install certified proprietary NVIDIA drivers.",
          "Install NVIDIA Container Toolkit (nvidia-ctk) to dynamically inject GPU character devices (/dev/nvidia*) into unprivileged container namespaces.",
          "Deploy NVIDIA GPU Operator in Kubernetes to advertise nvidia.com/gpu resources to the kube-scheduler."
        ],
        code: `# Blacklist nouveau & install driver
echo "blacklist nouveau" | sudo tee /etc/modprobe.d/blacklist-nouveau.conf
sudo update-initramfs -u
sudo apt-get install -y nvidia-driver-550 nvidia-container-toolkit
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker`
      }
    ]
  },
  {
    id: "k8s-infrastructure",
    title: "Kubernetes (K8s) & Infrastructure Tools",
    content: [
      "Kubernetes operates as a declarative distributed operating system, separating the control plane coordination from node execution."
    ],
    subsections: [
      {
        title: "Control Plane Architecture",
        points: [
          "kube-apiserver: The JSON/REST gateway for the cluster. All components communicate solely through the API server.",
          "etcd: Distributed, transactional key-value store holding the complete cluster state via Raft consensus.",
          "kube-scheduler: Assigns unscheduled pods to nodes based on resource capacity, affinity rules, and taints.",
          "kube-controller-manager: Continuous reconciliation control loops (Deployment, ReplicaSet, Node controllers)."
        ]
      },
      {
        title: "Worker Node Components & Tooling",
        points: [
          "containerd & kubelet: containerd executes container lifecycles; kubelet ensures PodSpecs are running on the node.",
          "kube-proxy: Maintains netfilter/iptables or IPVS network routing rules on the host.",
          "Terraform / OpenTofu & Ansible: Declarative cloud provisioning paired with agentless host configuration over SSH.",
          "Helm & ArgoCD: Package templating paired with declarative GitOps automated synchronization."
        ]
      }
    ]
  },
  {
    id: "deployment-autoscaling",
    title: "Deployment Strategies & Autoscaling",
    content: [
      "Zero-downtime deployments and multi-tier autoscaling ensure applications maintain performance under fluctuating load."
    ],
    asciiDiagram: `Rolling Update:       [v1] [v1] [v1]  --->  [v2] [v1] [v1]  --->  [v2] [v2] [v2]
Blue/Green:           Environment Blue (v1 Active) ---> Switch Router ---> Environment Green (v2 Active)
Canary:               95% traffic ---> [v1]  |  5% traffic ---> [v2] (Monitored for errors)`,
    subsections: [
      {
        title: "Deployment Methodologies",
        points: [
          "Rolling Updates: Gradually replaces old pods with new ones. Capacity remains stable without doubling infrastructure costs.",
          "Blue/Green Releases: Deploys an identical parallel environment (Green), validates health, then switches the router pointer immediately for instant rollback capability.",
          "Canary Releases: Routes 2-5% of traffic to the new release via Ingress/Service Mesh, verifying metrics before full rollout."
        ]
      },
      {
        title: "Autoscaling Tiers",
        points: [
          "Horizontal Pod Autoscaler (HPA): Adjusts pod replica counts based on CPU, memory, or custom metrics.",
          "Vertical Pod Autoscaler (VPA): Recommends and adjusts pod CPU/memory requests over time.",
          "Cluster Autoscaler & Karpenter: Dynamically provisions and terminates cloud virtual machines when pods are Pending due to resource exhaustion."
        ]
      }
    ]
  },
  {
    id: "multi-cloud",
    title: "Cloud Deployments: AWS vs. Azure vs. GCP",
    content: [
      "Each major hyperscaler provides specialized primitives across compute, managed Kubernetes, networking, and security."
    ],
    subsections: [
      {
        title: "Hyperscaler Architecture Comparison",
        points: [
          "Compute: AWS EC2 vs. Azure Virtual Machines vs. GCP Compute Engine (GCE).",
          "Managed Kubernetes: AWS EKS vs. Azure AKS vs. GCP GKE (industry gold standard for K8s tooling).",
          "Networking: AWS VPC (regional) vs. Azure VNet vs. GCP VPC (global network backbone by default).",
          "Object Storage: AWS S3 vs. Azure Blob Storage vs. GCP Cloud Storage (GCS).",
          "Identity & Access: AWS IAM vs. Microsoft Entra ID (Azure AD) vs. Google Cloud IAM."
        ]
      }
    ]
  },
  {
    id: "sre-core",
    title: "Site Reliability Engineering (SRE) Core Tenets",
    content: [
      "SRE applies software engineering principles to operations, establishing measurable reliability contracts and toil reduction."
    ],
    subsections: [
      {
        title: "SLI vs. SLO vs. SLA",
        points: [
          "SLI (Service Level Indicator): Quantifiable real-time metric (e.g., '% of HTTP requests returning <500 over 5 minutes').",
          "SLO (Service Level Objective): Target reliability goal agreed upon by product and engineering (e.g., '99.9% success over 30 days').",
          "SLA (Service Level Agreement): Contractual promise to external clients tied to financial credits if breached."
        ]
      },
      {
        title: "Error Budgets & Toil Elimination",
        points: [
          "Error Budget = 100% - SLO. A 99.9% SLO leaves a 0.1% error budget. When exhausted, feature releases freeze in favor of stability engineering.",
          "Toil is manual, repetitive work that scales linearly. SRE caps operational toil at <50% of engineer capacity, dedicating the rest to engineering and automation."
        ]
      }
    ]
  },
  {
    id: "observability-stack",
    title: "The Modern Observability Stack: Prometheus, Loki & Grafana",
    content: [
      "A unified observability architecture correlates metrics, logs, and distributed traces into a single pane of glass."
    ],
    asciiDiagram: `                +--------------------------------------------------------+
                |                  GRAFANA (Visualization)              |
                |        Single pane of glass for dashboards & alerts     |
                +-----------T-------------------------------T------------+
                            | (PromQL)                      | (LogQL)
                +-----------v----------+        +-----------v------------+
                |      PROMETHEUS      |        |          LOKI          |
                |   (Metrics Store)    |        |      (Log Store)       |
                +-----------T----------+        +-----------T------------+
                            | Scraping                      | Pushing
                +-----------v----------+        +-----------v------------+
                |    node_exporter /   |        |     Promtail / Fluentbit|
                |     App Endpoints    |        |      (/var/log/*.log)   |
                +----------------------+        +------------------------+`,
    subsections: [
      {
        title: "Component Roles",
        points: [
          "Prometheus: Pull-based time-series metrics engine. Periodically scrapes /metrics endpoints and stores numeric key-value labeled data for alerts via Alertmanager.",
          "Loki: High-efficiency log aggregator that does NOT index full text. It indexes only metadata labels (namespace, app) and stores compressed chunks in object storage (S3/MinIO), dramatically reducing storage and RAM costs.",
          "Grafana: Unified visualization querying Prometheus (PromQL) and Loki (LogQL) side-by-side to correlate metrics spikes directly with log traces."
        ]
      }
    ]
  }
];

export const HANDBOOK_QUESTIONS: HandbookQuestion[] = [
  {
    id: 1,
    question: "How Kubernetes Decides Node Scheduling for a Pod",
    category: "Kubernetes",
    summary: "The kube-scheduler assigns unscheduled pods through a deterministic three-stage pipeline: Filtering (predicates), Scoring (priorities 0-100), and Binding (optimistic AssumePod local cache reservation).",
    asciiDiagram: `              +-------------------------------------------------+
              |           Pod in Pending State                  |
              +-----------------------T-------------------------+
                                      |
                                      v
             +--------------------------------------------------+
             | 1. FILTERING (Predicates)                        |
             |    - NodeResourcesFit (CPU, RAM)                 |
             |    - NodeName & NodePorts                        |
             |    - PodTopologySpread / Affinity                |
             |    - Taints & Tolerations                        |
             |    Eliminates incapable nodes                    |
             +------------------------T-------------------------+
                                      | (List of Feasible Nodes)
                                      v
             +--------------------------------------------------+
             | 2. SCORING (Priorities: 0 to 100)                |
             |    - ImageLocalityPriority                       |
             |    - NodeResourcesBalancedAllocation             |
             |    - NodeAffinityScoring                         |
             |    Applies weighted sum to rank nodes            |
             +------------------------T-------------------------+
                                      |
                                      v
             +--------------------------------------------------+
             | 3. BINDING                                       |
             |    - Optimistic local cache reservation (Assume) |
             |    - Asynchronous POST /binding to API Server    |
             |    - Written to etcd (spec.nodeName)             |
             +--------------------------------------------------+`,
    steps: [
      {
        title: "1. Filtering Phase (Predicates)",
        details: "Eliminates nodes unable to support the pod: NodeResourcesFit checks remaining allocatable CPU/RAM against resources.requests; NodePorts checks port conflicts; TaintsAndTolerations verifies node taints match pod tolerations; NodeAffinity and TopologySpread verify zone distributions."
      },
      {
        title: "2. Scoring Phase (Priorities 0-100)",
        details: "Ranks candidate nodes using weighted plugins: NodeResourcesBalancedAllocation scores nodes higher when CPU/RAM usage is balanced; ImageLocality prioritizes nodes that already have the container images cached locally."
      },
      {
        title: "3. Binding Phase",
        details: "Picks the highest scoring node, executes an AssumePod operation in local scheduler cache to prevent concurrent race conditions, and asynchronously posts an HTTP Binding to kube-apiserver to persist spec.nodeName in etcd."
      }
    ],
    proTip: "If multiple nodes tie with the highest score, kube-scheduler uses round-robin to pick among them."
  },
  {
    id: 2,
    question: "Internal Flow of 'kubectl apply'",
    category: "Kubernetes",
    summary: "kubectl computes a client-side 3-way merge patch (Last-Applied-Configuration, Live State, Local File) and submits it to the API Server where it passes Authentication, RBAC, Mutating Webhooks, Schema Validation, and Validating Webhooks before etcd Raft commit.",
    asciiDiagram: `Client (kubectl) ---> API Server Authentication ---> Authorization (RBAC) ---> 
Mutating Webhooks ---> Schema Validation ---> Validating Webhooks ---> etcd (Raft Commit)`,
    steps: [
      {
        title: "Client-Side 3-Way Merge Calculation",
        details: "kubectl reads the live object's 'kubectl.kubernetes.io/last-applied-configuration' annotation, fetches the current live state from the API, and diffs them against the local YAML file. This preserves dynamically assigned fields (e.g. clusterIP, autoscaled replica count)."
      },
      {
        title: "Authentication & Authorization",
        details: "The request is transmitted via TLS to kube-apiserver, authenticated via x509 certs/OIDC tokens, and authorized against RBAC policies."
      },
      {
        title: "Admission Control Pipeline",
        details: "First, Mutating Admission Webhooks modify the object (e.g. Istio sidecar injection). Next, OpenAPI schema validation executes. Finally, Validating Admission Webhooks (OPA/Kyverno) enforce security constraints."
      },
      {
        title: "Persistence & Event Notification",
        details: "The object is serialized into Protocol Buffers and written to etcd via Raft consensus. Watching controllers receive HTTP/2 chunked watch events."
      }
    ]
  },
  {
    id: 3,
    question: "How Kubernetes Service Discovery & Networking Works",
    category: "Kubernetes",
    summary: "Services are virtual ClusterIP abstractions resolved via CoreDNS. Traffic routing is enforced on worker nodes by kube-proxy using either iptables DNAT rules, IPVS hash tables, or eBPF socket-level hooks.",
    asciiDiagram: `                         CoreDNS
             "my-svc.default.svc.cluster.local"
                            |
               Resolves to Virtual IP: 10.96.0.15 (ClusterIP)
                            |
                            v
Client Pod ---> Kernel Netfilter / iptables / eBPF (kube-proxy)
                            |
       Rewrites Destination IP (DNAT) using random distribution
                            |
                            v
          Actual Backend Pod IP (e.g., 10.244.1.42:8080)`,
    steps: [
      {
        title: "DNS Resolution (CoreDNS)",
        details: "kubelet injects CoreDNS IP into /etc/resolv.conf with search domains. Querying '<service>.<namespace>.svc.cluster.local' returns the virtual ClusterIP."
      },
      {
        title: "The Virtual ClusterIP",
        details: "The ClusterIP does not exist on any physical interface. It is a virtual routing trap caught in the Linux kernel netfilter/eBPF layers."
      },
      {
        title: "Data Plane Routing Modes",
        details: "iptables mode uses random statistic modules to rewrite destination IP (DNAT) to a healthy pod. IPVS mode uses kernel hash tables for O(1) lookups at scale. eBPF (Cilium) hooks directly into socket creation (sock_ops), bypassing netfilter entirely."
      }
    ]
  },
  {
    id: 4,
    question: "Readiness vs. Liveness Probes Internally",
    category: "Kubernetes",
    summary: "Both probes are executed by the local kubelet, but handle failures differently: Liveness kills and restarts deadlocked containers (SIGTERM/SIGKILL), while Readiness removes unhealthy pods from Service EndpointSlices without restarting.",
    steps: [
      {
        title: "Liveness Probe Failure Flow",
        details: "Catches deadlocks or unrecoverable panics. When consecutive failures exceed the threshold, kubelet initiates container termination: sends SIGTERM, waits terminationGracePeriodSeconds, sends SIGKILL, and applies exponential backoff restarts."
      },
      {
        title: "Readiness Probe Failure Flow",
        details: "Catches temporary overload or startup initialization. On failure, kubelet marks pod Ready=False in status. The EndpointSlice controller removes the pod IP from service endpoints. kube-proxy purges the routing rule so zero traffic is sent to the pod."
      }
    ],
    proTip: "Never point a Liveness probe at external dependencies like databases; if the database slows down, every pod restarts in a cascading crash loop!"
  },
  {
    id: 5,
    question: "How HPA Makes Scaling Calculations & Decisions",
    category: "Kubernetes",
    summary: "The HPA control loop runs every 15s in kube-controller-manager calculating: DesiredReplicas = ceil[CurrentReplicas * (CurrentMetric / TargetMetric)], with a 10% tolerance band and 5-minute downscale cooldown.",
    steps: [
      {
        title: "The Mathematical Scaling Formula",
        details: "DesiredReplicas = ceil[ CurrentReplicas * ( CurrentMetricValue / TargetMetricValue ) ]. For example: 3 replicas at 75% utilization with a 50% target yields ceil[ 3 * (75/50) ] = ceil[ 4.5 ] = 5 replicas."
      },
      {
        title: "Tolerance Band & Thrashing Prevention",
        details: "If |(CurrentMetric / TargetMetric) - 1.0| <= 0.1 (10%), scaling is skipped to avoid minor oscillations. A default 5-minute downscale stabilization window prevents flapping."
      },
      {
        title: "Reconciliation",
        details: "The controller patches spec.replicas on the target Deployment or ReplicaSet via the /scale subresource."
      }
    ]
  },
  {
    id: 6,
    question: "Kernel Execution Flow of 'docker run'",
    category: "Linux & Containers",
    summary: "docker CLI communicates with dockerd, which delegates to containerd and containerd-shim to invoke runc. runc creates Linux kernel namespaces via clone(), applies cgroups limits, configures OverlayFS merged rootfs, drops capabilities, and calls execve().",
    asciiDiagram: `docker run ---> dockerd (REST API) ---> containerd (gRPC) ---> containerd-shim ---> runc (OCI) ---> Linux Kernel
                                                                                                    |
                                      +-------------------------------------------------------------+
                                      v
             Linux Kernel Primitives:
             - clone() with CLONE_NEW* (Namespaces: PID, NET, MNT, IPC, UTS, USER)
             - cgroups v1/v2 (/sys/fs/cgroup limits for CPU/RAM)
             - pivot_root() onto OverlayFS merged rootfs
             - seccomp-bpf system call filters + dropped Capabilities
             - veth pair creation (eth0 inside, veth* on docker0 bridge)
             - execve() replaces runc process with container entrypoint`,
    steps: [
      {
        title: "CLI to OCI Daemon Handoff",
        details: "CLI sends HTTP POST to dockerd over /var/run/docker.sock. dockerd calls containerd via gRPC, which spawns containerd-shim and invokes runc."
      },
      {
        title: "OverlayFS Filesystem Construction",
        details: "Mounts immutable lowerdir image layers, a thin container read-write upperdir, and workdir into a unified 'merged' directory."
      },
      {
        title: "Kernel Isolation via Syscalls",
        details: "runc calls clone() with CLONE_NEWPID, CLONE_NEWNET, CLONE_NEWNS, CLONE_NEWIPC, CLONE_NEWUTS. Sets resource limits under /sys/fs/cgroup/. Calls pivot_root() into the merged rootfs and drops unnecessary capabilities."
      },
      {
        title: "Execution via execve()",
        details: "Allocates a veth pair (eth0 inside, veth* on docker0 bridge) and replaces the runc process image with the container entrypoint via execve()."
      }
    ]
  },
  {
    id: 7,
    question: "How Docker Layer Caching Works",
    category: "Linux & Containers",
    summary: "Docker computes SHA256 hashes of Dockerfile instructions and parent layers. For COPY/ADD, checksums of file contents are compared. If any layer changes, that layer and all subsequent layers are invalidated (cache bust).",
    asciiDiagram: `Dockerfile Instruction:           Internal Layer Hash State:
FROM ubuntu:22.04            ---> Layer A: sha256:7f3b... (Cached)
RUN apt-get update           ---> Layer B: sha256:1a8c... (Cached)
COPY package.json .          ---> Layer C: sha256:d4e9... (File hash matches -> CACHED)
COPY . .                     ---> Layer D: sha256:99ff... (File hash CHANGED -> CACHE BUST!)
RUN npm build                ---> Layer E: RE-EXECUTED from scratch (Invalidated!)`,
    steps: [
      {
        title: "Instruction Hash Matching",
        details: "For RUN instructions, Docker checks if the command string and parent layer hash match an existing cache entry. For COPY/ADD, it computes SHA256 checksums of source files."
      },
      {
        title: "Cascading Invalidation",
        details: "Because layers are built sequentially on top of previous parent hashes, a single cache miss invalidates all downstream instructions in that stage."
      },
      {
        title: "BuildKit SolveOps DAG",
        details: "Modern Docker BuildKit converts the Dockerfile into a directed acyclic graph of SolveOps, allowing parallel independent stage builds and separate cache branches."
      }
    ]
  },
  {
    id: 8,
    question: "Terraform's Directed Acyclic Graph (DAG) Execution Engine",
    category: "Infrastructure as Code",
    summary: "Terraform compiles declarative configurations into an in-memory Directed Acyclic Graph (DAG), executes Tarjan's cycle detection algorithm, topologically sorts nodes, and walks the graph concurrently up to -parallelism limits.",
    asciiDiagram: `       [aws_vpc.main]
             ^
             | (implicit dependency via vpc_id)
      [aws_subnet.web]
             ^
             | (implicit dependency via subnet_id)
    [aws_instance.server]`,
    steps: [
      {
        title: "Graph Construction",
        details: "Nodes represent resources, modules, and providers. Edges are inferred from implicit attribute references (aws_subnet.web.vpc_id -> aws_vpc.main.id) or explicit 'depends_on' directives."
      },
      {
        title: "Cycle Detection & Topological Sorting",
        details: "Tarjan's strongly connected components algorithm checks for circular dependencies. Topological sorting produces an ordered execution list from leaves to root."
      },
      {
        title: "Concurrent Graph Walk",
        details: "A worker pool walks the graph (default -parallelism=10). Independent resources provision simultaneously; dependent nodes wait until upstream prerequisite edges resolve."
      }
    ]
  },
  {
    id: 9,
    question: "Terraform State Locking & Consistency Mechanisms",
    category: "Infrastructure as Code",
    summary: "Terraform uses distributed locks (e.g. AWS DynamoDB conditional writes on LockID) to prevent concurrent state modifications, tracking lineage GUIDs and monotonically increasing serial counters.",
    asciiDiagram: `Engineer A: terraform apply ---> Acquires DynamoDB Lock ---> Updates State ---> Releases Lock
Engineer B: terraform apply ---> Checks DynamoDB Lock ---> 423 Locked! Fails fast & aborts`,
    steps: [
      {
        title: "Lock Acquisition",
        details: "Before plan or apply, Terraform writes an item to DynamoDB with a conditional expression 'attribute_not_exists(LockID)'. The lock item includes Lock ID, operation, username, and timestamp."
      },
      {
        title: "Collision & Abort",
        details: "If another engineer or CI/CD job holds the lock, DynamoDB returns a ConditionalCheckFailedException and Terraform halts immediately."
      },
      {
        title: "State Integrity Verification",
        details: "State files track a 'lineage' unique identifier and an incrementing 'serial' integer to prevent stale out-of-order state overwrites."
      }
    ]
  },
  {
    id: 10,
    question: "Lifecycle of a CI/CD Pipeline from Commit to Deployment",
    category: "CI/CD & Git",
    summary: "A git push triggers signed webhooks to the CI coordinator, which assigns ephemeral runners to build, test, package with BuildKit, sign container images with Cosign, and deploy via push or pull (ArgoCD GitOps).",
    asciiDiagram: `1. Developer pushes commit to Git
         |
         v
2. Git Server fires Webhook (HTTP POST + HMAC SHA256 signature)
         |
         v
3. CI Coordinator validates signature, evaluates pipeline YAML, enqueues jobs
         |
         v
4. Runner registers, downloads artifact, checks out commit SHA
         |
         v
5. Build & Test: executes unit tests, lints code, compiles binary
         |
         v
6. Containerization: Docker BuildKit builds image, tags with commit SHA, signs via Cosign
         |
         v
7. Registry: Pushes image to ECR/GCR/Artifact Registry
         |
         v
8. Deployment:
   - Push Model: Runner runs helm upgrade/terraform apply with short-lived OIDC tokens
   - Pull Model (GitOps): ArgoCD notices Git manifest change and synchronizes K8s cluster`,
    steps: [
      {
        title: "Webhook Ingestion & Validation",
        details: "Git provider sends an HTTP POST with HMAC-SHA256 signature. CI coordinator validates authenticity and parses pipeline YAML."
      },
      {
        title: "Ephemeral Runner Execution",
        details: "An isolated runner boots up, checks out the exact commit SHA, executes unit/lint tests, and compiles binaries."
      },
      {
        title: "Build, Sign & Push",
        details: "BuildKit creates multi-arch container images tagged with the commit SHA, signs them using Cosign cryptographic key pairs, and pushes to an enterprise registry."
      },
      {
        title: "Deployment Delivery",
        details: "Push delivery assumes short-lived cloud IAM roles via OIDC federation. Pull delivery (GitOps) commits new image tags to an environment repository where ArgoCD synchronizes cluster state."
      }
    ]
  },
  {
    id: 11,
    question: "How Pipelines Manage Parallel Execution & Dependencies",
    category: "CI/CD & Git",
    summary: "Pipelines model execution as a Directed Acyclic Graph (DAG) using dependencies ('needs'), fan out multi-dimensional matrix builds in parallel, and exchange state across isolated runner filesystems via object storage artifacts.",
    steps: [
      {
        title: "DAG Workflow Scheduling",
        details: "Jobs declare upstream prerequisites using 'needs: [jobA, jobB]'. The engine executes all unblocked tasks concurrently as soon as dependencies succeed."
      },
      {
        title: "Matrix Strategy Fan-Out",
        details: "Generates Cartesian combinations of declared parameters (e.g. OS: [ubuntu, windows], Node: [18, 20]), spawning independent parallel jobs."
      },
      {
        title: "Artifact Isolation & Staging",
        details: "Because ephemeral runners run on separate VMs, intermediate files are zipped and uploaded to shared cloud object storage (S3/GCS) between job stages."
      }
    ]
  },
  {
    id: 12,
    question: "How AWS ALB (L7) and NLB (L4) Route Network Traffic",
    category: "Cloud & Networking",
    summary: "AWS ALB acts as a Layer 7 reverse proxy terminating TCP/TLS and parsing HTTP headers, while AWS NLB acts as a Layer 4 line-rate forwarder using Hyperplane SDN consistent hashing with zero TCP termination.",
    asciiDiagram: `                    ALB (Layer 7)                                     NLB (Layer 4)
           Terminates TCP/TLS Proxying                      Zero-Termination Packet Forwarding
 +----------------------------------------------+ +----------------------------------------------+
 | 1. Client completes TCP + TLS with ALB       | | 1. Client sends SYN packet                   |
 | 2. ALB fully parses HTTP/2 & Request Headers | | 2. Hyperplane SDN applies 4-tuple Hash       |
 | 3. Evaluates Routing Rules (Path/Host/Cookie)| | 3. Rewrites packet headers at line rate      |
 | 4. Opens a NEW TCP connection to target pod  | | 4. Routes packet directly to target EC2/Pod  |
 | 5. Injects X-Forwarded-* headers             | |    preserving original Client Source IP      |
 +----------------------------------------------+ +----------------------------------------------+`,
    steps: [
      {
        title: "Application Load Balancer (ALB - L7)",
        details: "Client completes TCP handshake and TLS session directly with the ALB node. ALB parses HTTP headers, path, method, and cookies, evaluates routing rules, selects a target via round-robin or least-outstanding requests, and establishes a separate backend TCP connection with X-Forwarded-For headers."
      },
      {
        title: "Network Load Balancer (NLB - L4)",
        details: "Built on AWS Hyperplane distributed SDN. Does not terminate TCP. Computes a 4-tuple hash (Source/Dest IP & Port) and routes packets directly to targets with microsecond latency, preserving the client's real source IP without X-Forwarded headers."
      }
    ]
  },
  {
    id: 13,
    question: "Edge to Origin Flow of a CloudFront Request",
    category: "Cloud & Networking",
    summary: "A CloudFront request routes via Anycast/Geo-DNS to the nearest Edge PoP. On cache miss, it queries a Regional Edge Cache (REC) before retrieving the asset over the AWS private backbone from the origin (S3/ALB).",
    asciiDiagram: `Client ---> Geo-DNS / Anycast ---> Nearest Edge PoP ---> (Cache Miss) ---> Regional Edge Cache ---> (Miss) ---> Origin (S3/ALB)
  ^                                    |                                        |
  +-------- (Cache Hit) ---------------+-------------- (Cache Hit) -------------+`,
    steps: [
      {
        title: "Anycast & Geo-DNS Routing",
        details: "Route 53 latency-based routing steers the client DNS query to the physically nearest CloudFront Point of Presence (PoP)."
      },
      {
        title: "Edge Handshake & Cache Evaluation",
        details: "Client completes TLS 1.3 handshake with OCSP stapling. The edge server hashes request path, query parameters, and whitelisted headers. On a hit, content is returned immediately."
      },
      {
        title: "Regional Edge Cache & Origin Fetch",
        details: "On an edge miss, the request cascades to a Regional Edge Cache (REC). If missing there, it traverses AWS's private optical fiber backbone to the S3 bucket or ALB origin, caching the response at both tiers."
      }
    ]
  },
  {
    id: 14,
    question: "Step-by-Step DNS Resolution Architecture",
    category: "Cloud & Networking",
    summary: "DNS resolution traverses local cache -> Recursive Resolver -> Root Nameserver (.) -> TLD Nameserver (.com) -> Authoritative Nameserver (awsdns) -> Client with a Time to Live (TTL).",
    asciiDiagram: `Client ---(1) Check local cache/hosts
  |
  v (Cache miss)
Recursive Resolver (8.8.8.8)
  |
  +---> (2) Query Root Server (".") ------------> Returns: ".com TLD Nameserver"
  |
  +---> (3) Query TLD Server (".com") ----------> Returns: "example.com Authoritative Nameserver"
  |
  +---> (4) Query Authoritative ("example.com") -> Returns: "A Record: 93.184.216.34 (TTL: 300)"
  |
  v
Recursive Resolver caches record and returns IP to Client`,
    steps: [
      {
        title: "Local Lookup",
        details: "Checks browser cache, OS resolver (systemd-resolved on Linux), and /etc/hosts file."
      },
      {
        title: "Recursive Resolver Query",
        details: "On cache miss, sends UDP Port 53 query to configured recursive resolver (e.g. 1.1.1.1 or 8.8.8.8)."
      },
      {
        title: "Root & TLD Delegation",
        details: "Resolver queries a Root Server ('.'), which refers it to the .com TLD server, which in turn returns the delegated Authoritative Nameservers for the domain."
      },
      {
        title: "Authoritative Response & TTL",
        details: "Authoritative nameserver returns the record (A, CNAME, etc.) along with TTL. The resolver caches the record for the TTL duration and returns the IP to the client."
      }
    ]
  },
  {
    id: 15,
    question: "Internal Differences Between Git Merge and Git Rebase",
    category: "CI/CD & Git",
    summary: "Git Merge creates a new non-destructive merge commit with two parent pointers preserving history, while Git Rebase sequentially replays diffs onto the target tip, rewriting commit hashes to form a clean linear history.",
    asciiDiagram: `                MERGE (Non-destructive, creates merge commit with 2 parents)
                
                     C --- D (feature)
                    /       \
               A -- B ------- M (main: M has two parents: B and D)

                REBASE (Linear history, rewrites commits with new hashes)
                
                     C --- D (feature)
                    /
               A -- B (main)
                    |
                    v (Rebase feature onto main)
               A -- B (main) --- C' --- D' (feature: C' and D' have new SHAs!)`,
    steps: [
      {
        title: "Git Merge (3-Way Merge)",
        details: "Finds the common ancestor (merge base), calculates diffs from base to main and base to feature, and generates a new merge commit containing two parent hashes (Parent 1 = B, Parent 2 = D). Non-destructive but results in branching topology."
      },
      {
        title: "Git Rebase",
        details: "Finds the merge base, exports feature branch commit diffs (C, D) to temporary files, resets the branch head to the target tip (B), and sequentially replays each patch. Every replayed commit gets a new timestamp, parent pointer, and SHA hash."
      }
    ],
    proTip: "Golden Rule of Rebase: Never rebase commits that have been pushed to a public shared branch, as it disrupts history for other collaborators."
  },
  {
    id: 16,
    question: "Kubernetes Pod Failure Handling & Self-Healing Workflows",
    category: "Kubernetes",
    summary: "Process failures on healthy nodes trigger kubelet restarts with exponential CrashLoopBackOff. Node hardware failures cause missed node-leases (40s grace), marking the node NotReady, followed by pod eviction (300s) and rescheduling.",
    asciiDiagram: `Failure Type 1: Container Process Dies
Container Crashing ---> kubelet detects via runtime ---> Applies restartPolicy ---> CrashLoopBackOff (exponential delay)

Failure Type 2: Entire Node Goes Down / Network Cut
Node stops heartbeat ---> Kube Controller marks "NotReady" (40s) ---> Eviction Timeout (300s) ---> Re-creates Pod on healthy node`,
    steps: [
      {
        title: "Process Failure on a Healthy Node",
        details: "kubelet receives container exit code from containerd. If restartPolicy is Always or OnFailure, it restarts the container with exponential backoff delay (10s, 20s, 40s, 80s, 160s, max 300s - CrashLoopBackOff)."
      },
      {
        title: "Node Failure & Eviction",
        details: "Nodes renew leases in kube-node-lease every 10s. If heartbeats cease for 40s (--node-monitor-grace-period), kube-controller-manager marks the node NotReady. After pod-eviction-timeout (default 300s), pods are marked for deletion, ReplicaSet controller spawns replacements, and kube-scheduler binds them to healthy nodes."
      }
    ]
  },
  {
    id: 17,
    question: "Rolling Deployment Orchestration in Kubernetes",
    category: "Kubernetes",
    summary: "DeploymentController creates a new ReplicaSet and scales it up while scaling the old ReplicaSet down, strictly governed by maxSurge and maxUnavailable constraints until 100% migrated.",
    asciiDiagram: `Desired: 4 Replicas. maxSurge: 25% (+1), maxUnavailable: 25% (-1)

Step 1: Create RS-v2. Scale RS-v2 to 1 pod. (Total: 4 v1 + 1 v2 = 5 pods <= maxSurge)
Step 2: Wait for Pod v2 readiness probe to pass. Add v2 to Service Endpoints.
Step 3: Scale RS-v1 down to 3 pods. (Total: 3 v1 + 1 v2 = 4 pods)
Step 4: Repeat progressively until RS-v2 = 4 pods, RS-v1 = 0 pods.`,
    steps: [
      {
        title: "Trigger & ReplicaSet Creation",
        details: "Mutating the pod template hash triggers DeploymentController to create a new ReplicaSet (rs-v2)."
      },
      {
        title: "Constraint Enforcement",
        details: "Governed by maxSurge (extra pods allowed above desired) and maxUnavailable (maximum pods that can be offline). Scales up rs-v2 pods within surge bounds."
      },
      {
        title: "Readiness Gate & Old Pod Teardown",
        details: "When new pods pass readiness probes, they are added to service endpoints. Old pods in rs-v1 receive SIGTERM, execute preStop hooks, wait for terminationGracePeriodSeconds, and are terminated with SIGKILL."
      }
    ]
  },
  {
    id: 18,
    question: "Correlating Metrics, Logs, and Distributed Traces",
    category: "SRE & Observability",
    summary: "Triangulates incidents across the 3 observability pillars: Metrics detect WHAT is failing and WHEN; Traces pinpoint WHERE along the distributed call path; Logs explain WHY at the line-of-code level.",
    asciiDiagram: `+------------------------+      +------------------------+      +------------------------+
|   METRICS (Prometheus) |      |   TRACES (Jaeger/Otel) |      |      LOGS (Loki)       |
|                        |      |                        |      |                        |
| Aggregated Numbers     | ---> | Request Path Context   | ---> | Text Evidence          |
| Detects WHAT & WHEN    |      | Localizes WHERE        |      | Explains WHY           |
| "HTTP 500 error rate   |      | "CartService DB query  |      | "NullPointerException: |
| spiked to 15% at 2:03" |      | took 4200ms on Span X" |      | database connection 42"|
+------------------------+      +------------------------+      +------------------------+`,
    steps: [
      {
        title: "Metrics (Detection)",
        details: "Time-series numbers and gauges in Prometheus. Inexpensive to store. Answers: 'Is the system degraded right now, when did it begin, and which service is alerting?'"
      },
      {
        title: "Traces (Localization)",
        details: "Request-scoped trace context (W3C traceparent header containing trace_id and span_id) propagates across service boundaries. Answers: 'Where along the microservice call chain is the bottleneck or error located?'"
      },
      {
        title: "Logs (Root Cause)",
        details: "Unstructured or structured text in Loki. Answers: 'Why did the code fail?' (e.g. stack trace, connection timeout, out of memory)."
      },
      {
        title: "Correlation Workflow in Grafana",
        details: "Spike on a Prometheus metrics chart -> click exemplar with trace_id -> view Jaeger/Tempo trace waterfall -> click failing child span -> filter Loki logs by trace_id to inspect exact error message."
      }
    ]
  },
  {
    id: 19,
    question: "SRE Production Outage Troubleshooting Methodology",
    category: "SRE & Observability",
    summary: "SRE incident resolution follows 4 steps: Triage & appoint Incident Commander -> Mitigate first (restore availability via rollback/killswitch before deep root cause analysis) -> Systematic USE & RED investigation -> Blameless Postmortem.",
    asciiDiagram: `Step 1: TRIAGE & ALIGN
        Declare incident, assign Incident Commander, establish war-room (Slack/Zoom).

Step 2: MITIGATE FIRST (Restore the Service Before Deep Debugging)
        Ask: "What changed recently?" (Deployments, feature flags, DNS, configs).
        Action: Roll back recent release, toggle kill-switches, or add capacity.

Step 3: SYSTEMATIC INVESTIGATION (USE & RED Methods)
        +------------------------------------+-----------------------------------+
        |        Application Layer (RED)     |        Infrastructure Layer (USE) |
        | - Rate (Requests per second)       | - Utilization (% CPU, RAM)       |
        | - Errors (HTTP 5xx, failed jobs)   | - Saturation (Queue depth, OOM)   |
        | - Duration (Latency p95, p99)      | - Errors (Dropped packets, disk)  |
        +------------------------------------+-----------------------------------+

Step 4: POSTMORTEM & PERMANENT REMEDIATION
        Write a Blameless Postmortem. Document timeline, root causes, and actionable Jira items.`,
    steps: [
      {
        title: "1. Triage & Align",
        details: "Declare incident severity. Appoint an Incident Commander (IC) to run communications, assign leads, and prevent duplicate or conflicting production changes."
      },
      {
        title: "2. Mitigate First",
        details: "80%+ of outages stem from recent changes (deployments, config, networking). Restore availability immediately by rolling back the release, toggling feature flags, or shedding load before spending hours root-cause debugging."
      },
      {
        title: "3. Systematic Investigation (RED & USE)",
        details: "For applications, check RED metrics: Rate (requests/sec), Errors (5xx rate), Duration (latency p95/p99). For infrastructure, check USE metrics: Utilization (% CPU/memory), Saturation (queue depth, connection pool exhaustion), Errors (dropped packets, disk write failures)."
      },
      {
        title: "4. Blameless Postmortem",
        details: "Document timeline, trigger events, contributing factors, detection gaps, and actionable preventive engineering tasks in Jira."
      }
    ]
  },
  {
    id: 20,
    question: "Critical Production Anti-Patterns in DevOps",
    category: "SRE & Observability",
    summary: "The 6 most destructive production mistakes: missing K8s resource requests/limits, bloated external-dependency liveness probes, mutable :latest container tags, unencrypted hardcoded secrets, alert fatigue, and single points of failure (SPOF).",
    steps: [
      {
        title: "1. Omitting Resource Requests & Limits",
        details: "Without requests, kube-scheduler makes blind placement choices. Without limits, a memory leak in one container triggers the Linux kernel OOM-Killer to terminate neighbor pods on the same node."
      },
      {
        title: "2. Overloaded Liveness Probes",
        details: "Testing external dependencies (e.g. database, cache) in a liveness probe causes every pod to restart simultaneously when the dependency hiccups, magnifying a temporary glitch into a total outage."
      },
      {
        title: "3. Mutable ':latest' Tags & Floating Dependencies",
        details: "Deploying ':latest' without lockfiles produces non-deterministic environments where different pods run different code versions and rollbacks are impossible."
      },
      {
        title: "4. Hardcoded Secrets in Repositories",
        details: "Storing plaintext tokens or credentials in git commits or image layers instead of using Vault, AWS Secrets Manager, or CSI secret drivers."
      },
      {
        title: "5. Alert Fatigue",
        details: "Flooding on-call channels with non-actionable warning alerts, conditioning engineers to ignore pages when catastrophic failures occur."
      },
      {
        title: "6. Single Points of Failure (SPOF)",
        details: "Deploying multi-replica applications against a single standalone database instance in one AZ without automated replication or multi-AZ failover."
      }
    ]
  }
];
